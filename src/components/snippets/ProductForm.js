import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import { formatter } from "../../utils/helpers";
import ProductOptions from "./ProductOptions";
import Image from "next/image";
import SelectedDEVTOOL from "./SelectedDEVTOOL";

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
  const [selecteVariantQuantity, setSelecteVariantQuantity] = useState(1);

  function setOptions(name, value) {
    setSelectedOptions((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
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

    setSelectedVariant((prevState) => {
      return {
        ...prevState,
        [name]: value,
        variantQuantity: selecteVariantQuantity,
      };
    });
  }

  useEffect(() => {
    // This is fireing when the quantity changes.
    setSelectedVariant((prevState) => {
      return {
        ...prevState,
        variantQuantity: selecteVariantQuantity,
      };
    });
  }, [selecteVariantQuantity]);

  return (
    <div className="px-12">
      <SelectedDEVTOOL
        selectedVariant={selectedVariant}
        selectedOptions={selectedOptions}
        selecteVariantQuantity={selecteVariantQuantity}
      />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative w-full aspect-square">
          <Image
            src={selectedVariant.image}
            alt={"imagehere"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold ">{product.title}</h1>
          <h1 className="text-xl font-bold text-gray-500 ">
            {formatter.format(selectedVariant.variantPrice)}
          </h1>
          <p className="mt-2">{product.description}</p>

          <div className="mt-6">
            <label className="text-xl font-semibold" htmlFor="quantity">
              Quantity
            </label>
            <input
              onChange={(event) =>
                setSelecteVariantQuantity(+event.target.value)
              }
              type="number"
              id="quantity"
              name="variantQuantity"
              defaultValue="1"
              min="1"
              max="50"
              className="w-20 p-2 ml-2 border-2 border-gray-900"
            />
          </div>

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
              onClick={() => addToCart(selectedVariant, selecteVariantQuantity)}
              className="w-full px-2 py-3 mt-6 text-xl font-bold text-white bg-black hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
