import {
  getAllProductsWithTag,
  getAllProducts,
} from "../services/product.services";
import PageHero from "../components/snippets/PageHero";
import ProductCard from "../components/snippets/ProductCard";
import { useEffect, useState } from "react";
import FilterButtons from "../components/snippets/FilterButtons";

export default function Home({ products }) {
  // This is all super sloppy and i didnt refact just to save time.

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
      <PageHero />
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

      {/* <div className="px-6 mx-auto max-w-7xl">
        <h2 className="mb-12 text-4xl font-extrabold text-gray-900">
          All Products
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div> */}
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
