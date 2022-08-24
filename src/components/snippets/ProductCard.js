import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  let title = product.node.title.split(" - ")[0];
  let titleCased = title[0].toLowerCase() + title.substring(1);

  // console.log(product);

  const productTitle = product.node.title.split(" - ")[0];
  const productSubTitle = product.node.title.split(" - ")[1];
  return (
    <Link
      key={product.node.id}
      href={`/products/freebird-${titleCased}`}
      className="cursor-pointer "
    >
      <div className="relative group ">
        <div className="relative duration-150 cursor-pointer aspect-square group-hover:opacity-70 bg-slate-100">
          <Image
            src={product.node.images.edges[0].node.originalSrc}
            alt={product.node.images.edges[0].node.altText}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="flex flex-col justify-between mt-2">
          <div className="text-lg font-bold text-left text-gray-900 ">
            {productTitle}
          </div>
          <div className="text-left text-gray-900 text-md ">
            {productSubTitle}
          </div>
          <div>
            {/* {formatter.format(product.node.priceRange.minVariantPrice.amount)} */}
          </div>
        </div>
        <div className="mt-2 duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="text-sm text-gray-500">Available Sizes</div>
          <div className="flex flex-wrap justify-start gap-2 text-left text-gray-900 capitalize text-md">
            {product.node.variants.edges.map((variant, idx) => {
              return (
                <div
                  key={idx}
                  style={{ border: "1px solid black" }}
                  className={` flex items-center justify-center font-bold w-10 h-10 text-sm ${
                    variant.node.availableForSale
                      ? "bg-white cursor-pointer  hover:bg-gray-200  "
                      : "bg-gray-200 cursor-default text-gray-400 border-transparent "
                  }`}
                >
                  {variant.node.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
