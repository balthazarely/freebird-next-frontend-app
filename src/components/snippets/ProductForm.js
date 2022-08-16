import { useState, useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { formatter } from "../../utils/helpers";
import ProductOptions from "./ProductOptions";

export const ProductForm = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const allVariantOptions = product.variants.edges?.map((variant) => {
    const allOptions = {};

    variant.node.selectedOptions.map((item) => {
      allOptions[item.name] = item.value;
    });

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.originalSrc,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1,
    };
  });

  const defaultValues = {};
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  function setOptions(name, value) {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value };
    });

    const selection = {
      ...selectedOptions,
      [name]: value,
    };

    allVariantOptions.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item);
      }
    });
  }

  return (
    <div className="px-12">
      {/* <div className="w-full bg-slate-200">
        <div>
          variant selected:{" "}
          <span className="font-bold bg-white">
            {selectedVariant.variantTitle}
          </span>
        </div>

      </div> */}
      <h1 className="text-4xl font-bold ">{product.title}</h1>
      <h1 className="text-xl font-bold text-gray-500 ">
        {formatter.format(selectedVariant.variantPrice)}
      </h1>

      <div className="">
        {product.options.map(({ name, values }) => (
          <ProductOptions
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            setOptions={setOptions}
            selectedVariant={selectedVariant}
            //   productInventory={productInventory}
            //   available={available}
          />
        ))}
        <button
          onClick={() => addToCart(selectedVariant)}
          className="w-full px-2 py-3 mt-6 text-xl font-bold text-white bg-black hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
