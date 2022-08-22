import {
  getAllProductsWithTag,
  getAllProducts,
  paginateAllProducts,
} from "../services/product.services";
import PageHero from "../components/snippets/PageHero";
import ProductCard from "../components/snippets/ProductCard";
import { useEffect, useState } from "react";
import FilterButtons from "../components/snippets/FilterButtons";
import { testQuery } from "../services/test.querys";

export default function Home({ products }) {
  // PAGINATION EXAMPLE
  const [cursor, setCursor] = useState("");
  const [testData, setTestData] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paginateBy, setPaginateBy] = useState(0);

  useEffect(() => {
    const anotherTest = async () => {
      const res = await testQuery();
      console.log(res, "THIS ONE");
    };

    anotherTest();
  }, []);

  const testFetch = async () => {
    const { products } = await paginateAllProducts();
    setTestData(products.edges);
    setHasNextPage(products.pageInfo.hasNextPage);
    setCursor(products.edges[paginateBy].cursor);
    // console.log(products.edges);
    // console.log(testData);
  };

  useEffect(() => {
    testFetch();
  }, []);

  async function loadMore() {
    if (hasNextPage) {
      const { products } = await paginateAllProducts(cursor);
      // setTestData(...testData, products.edges);
      // setCursor(products.edges[2].cursor);
      products.edges.forEach((obj) => {
        setTestData((prevArray) => [...prevArray, obj]);
      });
      setHasNextPage(products.pageInfo.hasNextPage);
      if (products.pageInfo.hasNextPage) {
        setCursor(products.edges[paginateBy].cursor);
      }
      // console.log(products);
    }
    // console.log(testData);
  }

  // FILTERING EXAMPLE
  const [filteredProducts, setFilteredProducts] = useState();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [heel, setHeel] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProducts(true);
      const products = await getAllProductsWithTag("", "", "");
      console.log(products);
      setFilteredProducts(products);
      setLoadingProducts(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProducts(true);
      const products = await getAllProductsWithTag(color, gender, heel);
      setFilteredProducts(products);
      setLoadingProducts(false);
    };

    fetchData();
  }, [color, gender, heel]);

  return (
    <>
      {/* <PageHero /> */}

      {/* // PAGINATING EXAMPLE */}
      {/* <div className="px-6 mx-auto max-w-7xl">
          <div className="grid w-full grid-cols-3 gap-8">
            {testData &&
              testData.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
          </div>
          <button
            disabled={!hasNextPage}
            className={`px-5 py-2   rounded-lg ${
              !hasNextPage ? "bg-red-700 text-white" : "bg-green-800 text-white"
            } `}
            onClick={loadMore}
          >
            {hasNextPage ? "Load More" : "End of Products"}
          </button>
          <div>{cursor ? cursor : "loading"}</div>
        </div> */}

      {/* // FILTERING EXAMPLE */}
      <div className="px-6 mx-auto max-w-7xl">
        <div className="flex flex-row gap-6">
          <div className="w-2/12">
            <FilterButtons
              color={color}
              setColor={setColor}
              gender={gender}
              setGender={setGender}
              heel={heel}
              setHeel={setHeel}
            />
          </div>
          <div className="w-10/12">
            <div className="w-full px-2 py-6 mb-6 bg-slate-100">
              <div className="text-2xl font-bold ">
                {filteredProducts?.length} Results{" "}
              </div>
              <div className="mt-4">
                <code>
                  This is a fully tag-based sorting approach which will work
                  with the graphql pagination. This will require some work on
                  the tagging system in shopify.
                </code>
              </div>
            </div>
            <div className="grid w-full grid-cols-3 gap-8">
              {loadingProducts ? (
                <div className="w-full font-bold">Loading Data</div>
              ) : (
                filteredProducts &&
                filteredProducts.map((product, idx) => (
                  <>
                    <ProductCard key={idx} product={product} />
                  </>
                ))
              )}
            </div>
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
