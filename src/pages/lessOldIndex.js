import { getAllProductsWithTag } from "../services/product.services";
import ProductCard from "../components/snippets/ProductCard";
import { useEffect, useState } from "react";
import FilterButtons from "../components/snippets/FilterButtons";
import { getAllProductsTest } from "../services/test.querys";

export default function Home({ products }) {
  const [filteredProducts, setFilteredProducts] = useState();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [heel, setHeel] = useState("");
  const [priceGreaterThan, setPriceGreaterThan] = useState(0);
  const [priceLessThan, setPiceLessThan] = useState(1000);
  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paginateBy, setPaginateBy] = useState(3);

  const fetchData = async (cursor) => {
    setLoadingProducts(true);
    const loadMoreProducts = await getAllProductsWithTag(
      paginateBy,
      cursor,
      color,
      gender,
      heel,
      priceGreaterThan,
      priceLessThan
    );
    setFilteredProducts(loadMoreProducts.products.edges);
    setHasNextPage(loadMoreProducts.products.pageInfo.hasNextPage);
    setCursor(
      loadMoreProducts.products.edges[1]
        ? loadMoreProducts.products.edges[1].cursor
        : ""
    );
    setLoadingProducts(false);
  };

  const fetchMore = async (cursorFromFn) => {
    setLoadingProducts(true);
    const loadMoreProducts = await getAllProductsWithTag(
      paginateBy,
      cursorFromFn,
      color,
      gender,
      heel,
      priceGreaterThan,
      priceLessThan
    );
    loadMoreProducts.products.edges.forEach((obj) => {
      setFilteredProducts((prevArray) => [...prevArray, obj]);
    });
    setHasNextPage(loadMoreProducts.products.pageInfo.hasNextPage);
    setCursor(
      loadMoreProducts.products.edges[1]
        ? loadMoreProducts.products.edges[1].cursor
        : ""
    );
    setLoadingProducts(false);
  };

  useEffect(() => {
    fetchData();
  }, [gender, color, heel, priceGreaterThan, priceLessThan]);

  return (
    <>
      {testDataCursor}
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
              setPriceGreaterThan={setPriceGreaterThan}
              setPiceLessThan={setPiceLessThan}
              priceGreaterThan={priceGreaterThan}
              priceLessThan={priceLessThan}
            />
          </div>

          <div className="w-10/12">
            {/* <div className="w-full px-2 py-6 mb-6 bg-slate-100">
              <div className="text-2xl font-bold ">
                {filteredProducts?.length} Results{" "}
              </div>
              <div className="mt-4">
                <code>color: {color}</code>
                <br />
                <code>gender: {gender}</code>
                <br />
                <code>heel: {heel}</code>
                <br />
                <code>cursor: {cursor}</code>
                <br />
                <code>hasNextPage: {hasNextPage ? "true" : "false"}</code>
              </div>
            </div> */}
            <div className={`grid w-full grid-cols-3 gap-12 duration-200}`}>
              {filteredProducts &&
                filteredProducts.map((product, idx) => (
                  <ProductCard key={idx} product={product} />
                ))}
            </div>
            <div className="flex justify-center">
              <button
                className={`px-5 py-2 mt-8  rounded-lg ${
                  !hasNextPage
                    ? "bg-gray-500 text-white"
                    : "bg-gray-900 text-white"
                } `}
                onClick={() => fetchMore(cursor)}
              >
                {hasNextPage ? "Load More" : "End of Products"}
              </button>
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
