import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";

export default function ProductsForm({ products, name }) {
  const { addToCart } = useContext(CartContext);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    let combinedProductArray = [];
    products.forEach((variant) => {
      let color = variant.node.title.split(" - ")[1];
      variant.node.variants.edges.forEach((item) =>
        combinedProductArray.push({
          name: variant.node.title,
          id: item.node.id,
          handle: variant.node.handle,
          color: color,
          size: item.node.title,
          image: variant.node.images.edges,
          variantQuantity: 1,
        })
      );
    });
    setAllProducts(combinedProductArray);
    setSelectedProduct(combinedProductArray[0]);
    setSelectedOptions({
      name: combinedProductArray[0].name,
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
    console.log(selectedOptions);
  }

  useEffect(() => {
    let findCorrectVariant = allProducts.filter(
      (item) =>
        item.name === selectedOptions.name && item.size === selectedOptions.size
    );
    console.log(findCorrectVariant[0]);
    console.log(selectedProduct);
    setSelectedProduct(findCorrectVariant[0]);
  }, [selectedOptions]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-2 px-12">
        <div>
          {products.map((product, idx) => (
            <div
              className={`mb-12 ${
                selectedOptions.name === product.node.title ? "block" : "hidden"
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
                onClick={() => changeOptions("name", product.node.title)}
                className={`p-2 text-lg font-bold border-2 border-black rounded-md hover:bg-black hover:text-white ${
                  selectedOptions.name === product.node.title
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }  `}
              >
                {product.node.title}
              </button>
            ))}
          </div>
        </div>
        {/* <div className="">
          {allProducts?.map((product, idx) => (
            <button
              className="flex gap-6"
              key={idx}
              onClick={() => switchSelectedProduct(product)}
            >
              <div className="font-bold ">{product.name}</div>
              <div>
                size:{" "}
                <span className="font-bold text-red-500">{product.size}</span>
              </div>
            </button>
          ))}
        </div> */}
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
            onClick={() => {
              addToCart(selectedProduct);
              console.log(selectedProduct);
            }}
          >
            ADD TO CART
          </button>
          <div className="w-full px-2 py-6 mt-6 mb-6 bg-purple-200">
            {selectedOptions !== {} ? (
              <div>
                <div>{selectedOptions.name}</div>
                <div>{selectedOptions.size}</div>
              </div>
            ) : (
              "loading "
            )}
          </div>
          <div className="">
            {selectedProduct ? (
              <div className="w-full px-2 py-6 mt-6 mb-6 bg-slate-200">
                <div>
                  selected name:{" "}
                  <span className="font-bold">{selectedProduct.name}</span>
                </div>
                <div>
                  selected size:{" "}
                  <span className="font-bold">{selectedProduct.size}</span>
                </div>
                <div>
                  selected color:{" "}
                  <span className="font-bold">{selectedProduct.color}</span>
                </div>
                <div>
                  selected id:{" "}
                  <span className="font-bold">{selectedProduct.id}</span>
                </div>
                <div>{/* selectedOptions: <span></span> */}</div>
              </div>
            ) : (
              "loading products"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
