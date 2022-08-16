import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import { formatter } from "../../utils/helpers";
import ProductOptions from "./ProductOptions";
import Image from "next/image";
import SelectedDEVTOOL from "./SelectedDEVTOOL";
import axios from "axios";
import useSWR from "swr";

// setup inventory fetcher
const fetchInventory = (url, id) =>
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data);

export const ProductForm = ({ product }) => {
  const { data: productInventory } = useSWR(
    ["/api/available", product.handle],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  );

  // let variantImages = product.variants.edges.map((variant) => {
  //   let newColor = variant.node.selectedOptions.filter(
  //     (item) => item.name === "Color"
  //   );
  //   return {
  //     image: variant.node.image.originalSrc,
  //     value: newColor[0].value,
  //   };
  // });

  // const uniqueImages = Array.from(
  //   new Set(variantImages.map((a) => a.image))
  // ).map((id) => {
  //   return variantImages.find((a) => a.image === id);
  // });

  // console.log(variantImages, "variantImages");
  // console.log(uniqueImages, "uniqueImages");
  console.log(product, "product");

  const [available, setAvailable] = useState(true);
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

  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(
        (item) => item.node.id === selectedVariant.id
      );
      if (checkAvailable[0].node.availableForSale) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    }
  }, [productInventory, selectedVariant]);

  // console.log(productInventory, "productInventory");
  // console.log(product, "product");

  return (
    <div className="px-12">
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
              />
            ))}
            {available ? (
              <button
                onClick={() => {
                  addToCart(selectedVariant);
                }}
                className="w-full px-2 py-3 mt-6 text-xl font-bold text-white bg-black hover:bg-gray-800"
              >
                Add To Card
              </button>
            ) : (
              <button className="w-full px-2 py-3 mt-6 text-xl font-bold text-white bg-gray-500 cursor-not-allowed ">
                Sold out!
              </button>
            )}
            <div className="relative flex w-full gap-4 mt-6 ">
              {/* {uniqueImages.map((item) => {
                return (
                  <div
                    value={item.value}
                    name="option-Color"
                    className="relative w-1/3 aspect-square"
                    onClick={() => {
                      setOptions("option-Color", item.value);
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={"imagehere"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
        <SelectedDEVTOOL
          selectedVariant={selectedVariant}
          selectedOptions={selectedOptions}
          selecteVariantQuantity={selecteVariantQuantity}
        />
      </div>
    </div>
  );
};
