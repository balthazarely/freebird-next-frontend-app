import ProductCard from "../components/snippets/ProductCard";
import { useEffect, useState } from "react";
import { getAllProductsTest } from "../services/test.querys";
import ProductFilter from "../components/snippets/ProductFilter";
import SelectedProductFilter from "../components/snippets/SelectedProductFilter";
import Loader from "../components/snippets/Loader";
import Image from "next/image";

export default function Home() {
  const [testProducts, setTestProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState();
  const [testDataHasNextPage, setTestDataHasNextPage] = useState(true);
  const [testDataCursor, setTestDataCursor] = useState("");

  const [tags, setTags] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [filerByTag, setFilerByTag] = useState([]);
  const [filterBySize, setFilterBySize] = useState([]);
  const [filterType, setFilterType] = useState("every");

  const fetchTestProducts = async (cursor) => {
    const testdata = await getAllProductsTest(cursor);
    testdata.products.edges.forEach((obj) => {
      setTestProducts((prevArray) => [...prevArray, obj]);
      setFilteredProducts((prevArray) => [...prevArray, obj]);
    });

    //======= Get Product Tags  =======//
    const filterTags = testdata.products.edges.map((item) => {
      return item.node.tags.filter((tag) => tag.split(":")[0] === "FILTER");
    });

    setTags([...new Set(tags.concat([...new Set(filterTags.flat())]))]);

    //======= Get Product Tags  =======//
    const productSizes = testdata.products.edges
      .map((prod) => prod.node.variants.edges.map((edge) => edge.node.title))
      .flat();
    setSizes([
      ...new Set(
        sizes.concat([...new Set(productSizes)]).sort((a, b) => a - b)
      ),
    ]);

    //======= Pagination  =======//
    setTestDataHasNextPage(testdata.products.pageInfo.hasNextPage);
    setTestDataCursor(
      testdata.products.edges[2] ? testdata.products.edges[2].cursor : ""
    );
  };

  useEffect(() => {
    if (testDataHasNextPage) {
      fetchTestProducts(testDataCursor);
    }
  }, [testProducts]);

  //======= Filter Section  =======//
  const setTagFilter = (filter) => {
    if (filerByTag.includes(filter)) {
      setFilerByTag(filerByTag.filter((item) => item !== filter));
    } else {
      setFilerByTag((current) => [...current, filter]);
    }
  };

  const setSizeFilter = (size) => {
    if (filterBySize.includes(size)) {
      setFilterBySize(filterBySize.filter((item) => item !== size));
    } else {
      setFilterBySize((current) => [...current, size]);
    }
  };

  const clearFilters = () => {
    setFilterBySize([]);
    setFilerByTag([]);
  };

  useEffect(() => {
    const filterByTag = testProducts.filter((data) => {
      if (filerByTag.length === 0) {
        return data;
      }
      if (filerByTag.length !== 0) {
        if (filterType === "some") {
          return filerByTag.some(function (category) {
            if (data.node.tags) {
              return data.node.tags.includes(category);
            }
          });
        }
        if (filterType === "every") {
          return filerByTag.every(function (category) {
            if (data.node.tags) {
              return data.node.tags.includes(category);
            }
          });
        }
      }
    });
    // setFilteredProducts(filterByTag);
    const filterBySizssse = filterByTag.filter((data) => {
      if (filterBySize.length === 0) {
        return data;
      }
      if (filterBySize.length !== 0) {
        return filterBySize.some(function (category) {
          return data.node.variants.edges.some((item) =>
            item.node.title.includes(category)
          );
        });
      }
    });

    let sortedProducts = filterBySizssse.sort((a, b) =>
      a.node.title.localeCompare(b.node.title)
    );
    setFilteredProducts(sortedProducts);
  }, [filerByTag, filterBySize]);

  return (
    <>
      <div className="px-6 mx-auto mt-8 max-w-7xl">
        <div className="flex flex-row gap-6">
          <div className="sticky w-2/12 h-full top-8 ">
            {testDataHasNextPage ? (
              <div className="flex items-center justify-center w-full h-80">
                <Loader />
              </div>
            ) : (
              <>
                <ProductFilter
                  setTagFilter={setTagFilter}
                  filerByTag={filerByTag}
                  tags={tags}
                  setSizeFilter={setSizeFilter}
                  filterBySize={filterBySize}
                  sizes={sizes}
                />
                <SelectedProductFilter
                  filerByTag={filerByTag}
                  filterBySize={filterBySize}
                  setTagFilter={setTagFilter}
                  setSizeFilter={setSizeFilter}
                  clearFilters={clearFilters}
                />
              </>
            )}
          </div>

          <div className="w-10/12 ">
            {!testDataHasNextPage && (
              <h1 className="mb-6 text-4xl font-bold capitalize ">All Boots</h1>
            )}
            <div
              className={`grid w-full lg:grid-cols-3  sm:grid-cols-2 grid-cols -1 gap-12 duration-200}`}
            >
              {!testDataHasNextPage &&
                filteredProducts &&
                filteredProducts.map((product, idx) => {
                  return <ProductCard key={idx} product={product} />;
                  // }
                })}
            </div>
            {testDataHasNextPage && (
              <div className="flex items-center justify-center w-full h-80">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// export async function getStaticProps() {
//   const products = await getAllProducts();

//   return {
//     props: {
//       products,
//     },
//   };
// }
