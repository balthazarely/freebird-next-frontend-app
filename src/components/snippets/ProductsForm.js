import { useEffect, useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { formatter } from "../../utils/helpers";
import ProductImage from "./ProductImage";
import ProductsFormDEVTOOLS from "./ProductsFormDEVTOOLS";

export default function ProductsForm({ products, name }) {
  const { addToCart } = useContext(CartContext);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  console.log(products);
  useEffect(() => {
    let combinedProductArray = [];
    products.forEach((variant) => {
      let color = variant.node.title.split(" - ")[1];
      variant.node.variants.edges.forEach((item) =>
        combinedProductArray.push({
          variantTitle: variant.node.title,
          id: item.node.id,
          handle: variant.node.handle,
          color: color,
          size: item.node.title,
          images: variant.node.images.edges,
          variantQuantity: 1,
          variantPrice: item.node.priceV2.amount,
          description: variant.node.description,
        })
      );
    });
    setAllProducts(combinedProductArray);
    setSelectedProduct(combinedProductArray[0]);
    setSelectedOptions({
      variantTitle: combinedProductArray[0].variantTitle,
      size: combinedProductArray[0].size,
    });
  }, []);

  function changeOptions(name, value) {
    setSelectedOptions((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    let findCorrectVariant = allProducts.filter(
      (item) =>
        item.variantTitle === selectedOptions.variantTitle &&
        item.size === selectedOptions.size
    );
    setSelectedProduct(findCorrectVariant[0]);
  }, [selectedOptions]);

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="flex flex-col w-full gap-8 md:flex-row ">
        <div className="w-full md:w-2/3">
          <ProductImage selectedProduct={selectedProduct} />
        </div>
        <div className="sticky w-full h-full md:w-1/3 top-8 ">
          <h1 className="text-5xl font-bold capitalize">
            {name.products.split("-")[1]}
          </h1>

          <p className="mt-2 text-lg font-bold text-gray-600">
            {formatter.format(selectedProduct?.variantPrice)}
          </p>
          <p className="mt-8 text-sm">{selectedProduct?.description}</p>
          <div className="mt-16">
            <div className="flex flex-col items-start mb-6 ">
              <div className="mb-2 font-bold tracking-widest text-gray-400 uppercase text-md">
                Color
              </div>
              <div className="flex flex-row gap-4">
                {products.map((product, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      changeOptions("variantTitle", product.node.title)
                    }
                    className={`p-2 text-md font-bold border-2 duration-200  border-gray-800  hover:bg-gray-800 hover:text-white ${
                      selectedOptions.variantTitle === product.node.title
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-600"
                    }  `}
                  >
                    {product.node.title.split("-")[1]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div>
                {products.map((product, idx) => (
                  <div
                    className={`mb-12 ${
                      selectedOptions.variantTitle === product.node.title
                        ? "block"
                        : "hidden"
                    }`}
                    key={idx}
                  >
                    <div className="mb-2 font-bold tracking-widest text-gray-400 uppercase text-md">
                      Size
                    </div>
                    <div className="flex flex-wrap gap-4 ">
                      {product.node.variants.edges.map((variant, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            changeOptions("size", variant.node.title)
                          }
                          className={`flex items-center duration-200 justify-center w-12 h-12 border-2 border-gray-800  cursor-pointer hover:bg-gray-800 hover:text-white ${
                            selectedOptions.size === variant.node.title
                              ? "bg-gray-800 text-white"
                              : "bg-white text-gray-800"
                          }  `}
                        >
                          {variant.node.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="w-full px-2 py-3 mt-6 text-lg font-bold tracking-wider text-white bg-black hover:bg-gray-800"
            onClick={() => {
              addToCart(selectedProduct);
              console.log(selectedProduct);
            }}
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
}
{
  /* <ProductsFormDEVTOOLS
            selectedOptions={selectedOptions}
            selectedProduct={selectedProduct}
          /> */
}
