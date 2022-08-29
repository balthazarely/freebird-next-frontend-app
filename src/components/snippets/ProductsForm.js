import { useEffect, useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { formatter } from "../../utils/helpers";
import ProductImage from "./ProductImage";
import ProductModal from "./ProductModal";
import ProductsFormDEVTOOLS from "./ProductsFormDEVTOOLS";
import { useRouter } from "next/router";

export default function ProductsForm({ products, name }) {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showModal, setShowModal] = useState(false);

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
          availableForSale: item.node.availableForSale,
          images: variant.node.images.edges,
          variantQuantity: 1,
          variantPrice: item.node.priceV2.amount,
          description: variant.node.description,
        })
      );
    });
    setAllProducts(combinedProductArray);
  }, []);

  useEffect(() => {
    let selectedVar = router.query.variant;
    let selectedObj = allProducts.find(
      (product) => product.handle === selectedVar
    );

    if (selectedVar && selectedObj) {
      setSelectedProduct(selectedObj);
      setSelectedOptions({
        variantTitle: selectedObj.variantTitle,
        size: selectedObj.size,
      });
    }
  }, [router.query.variant, allProducts]);

  useEffect(() => {
    let findCorrectVariant = allProducts.filter(
      (item) =>
        item.variantTitle === selectedOptions.variantTitle &&
        item.size === selectedOptions.size
    );
    setSelectedProduct(findCorrectVariant[0]);
  }, [selectedOptions]);

  function openModalAndScrollToImage(image) {
    let foundImage = setShowModal(true);
  }

  function changeOptions(name, value) {
    setSelectedOptions((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  return (
    <div className="px-6 mx-auto max-w-7xl">
      <ProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedProduct={selectedProduct}
      />
      <div className="flex flex-col w-full gap-8 md:flex-row ">
        <div className="w-full md:w-2/3">
          <ProductImage
            selectedProduct={selectedProduct}
            openModalAndScrollToImage={openModalAndScrollToImage}
          />
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
                          className={`flex items-center duration-200 justify-center w-12 h-12  border-gray-800  cursor-pointer hover:bg-gray-800 hover:text-white ${
                            selectedOptions.size === variant.node.title
                              ? "bg-gray-800 text-white"
                              : "bg-white text-gray-800"
                          } ${
                            variant.node.availableForSale
                              ? "bg-white  border-2"
                              : "bg-gray-300 text-gray-800  border-0"
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
          {selectedProduct && (
            <button
              className={` w-full px-2 py-3 mt-6 text-lg font-bold tracking-wider text-white ${
                selectedProduct.availableForSale
                  ? "bg-black cursor-pointer "
                  : "bg-gray-500 cursor-not-allowed"
              }`}
              onClick={() => {
                if (selectedProduct.availableForSale) {
                  addToCart(selectedProduct);
                }
                console.log(selectedProduct);
              }}
            >
              {selectedProduct.availableForSale ? "Add To Bag" : "Sold Out"}
            </button>
          )}
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
