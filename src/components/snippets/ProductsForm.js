import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
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
          image: variant.node.images.edges[0].node.originalSrc,
          variantQuantity: 1,
          variantPrice: item.node.priceV2.amount,
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

  function changeOptions(variantTitle, value) {
    setSelectedOptions((prevState) => {
      return {
        ...prevState,
        [variantTitle]: value,
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
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-2 px-12">
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
              <div className="text-sm font-bold">{product.node.title}</div>
              <div className="flex gap-6 mt-4 ">
                {product.node.variants.edges.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => changeOptions("size", variant.node.title)}
                    className={`flex items-center justify-center w-12 h-12 border-2 border-black rounded-md cursor-pointer hover:bg-black hover:text-white ${
                      selectedOptions.size === variant.node.title
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }  `}
                  >
                    {variant.node.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col items-start gap-6 ">
            {products.map((product, idx) => (
              <button
                key={idx}
                onClick={() =>
                  changeOptions("variantTitle", product.node.title)
                }
                className={`p-2 text-lg font-bold border-2 border-black rounded-md hover:bg-black hover:text-white ${
                  selectedOptions.variantTitle === product.node.title
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }  `}
              >
                {product.node.title}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold ">{name.products}</h1>
          <div className="relative w-96 aspect-square">
            <Image
              src={products[0].node.images.edges[0].node.originalSrc}
              alt={"imagehere"}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <button
            className="px-2 py-3 mt-6 text-xl font-bold text-white bg-black w-96 hover:bg-gray-800"
            onClick={() => {
              addToCart(selectedProduct);
              console.log(selectedProduct);
            }}
          >
            ADD TO CART
          </button>
          <ProductsFormDEVTOOLS
            selectedOptions={selectedOptions}
            selectedProduct={selectedProduct}
          />
        </div>
      </div>
    </div>
  );
}
