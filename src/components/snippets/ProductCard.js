import Link from "next/link";
import Image from "next/image";
import { formatter } from "../../utils/helpers";

export default function ProductCard({ product }) {
  let title = product.node.title.split(" - ")[0];
  let titleCased = title[0].toLowerCase() + title.substring(1);

  return (
    <Link
      key={product.node.id}
      href={`/products/freebird-${titleCased}`}
      className="cursor-pointer"
    >
      <div>
        <div className="relative duration-150 cursor-pointer group aspect-square hover:opacity-75">
          <Image
            src={product.node.images.edges[0].node.originalSrc}
            alt={product.node.images.edges[0].node.altText}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-lg font-bold text-left text-gray-900 ">
            {product.node.title}
          </div>
          <div>
            {/* {formatter.format(product.node.priceRange.minVariantPrice.amount)} */}
          </div>
        </div>
        <div className="text-left text-gray-900 capitalize text-md">
          {product.node.tags[0]}
        </div>
      </div>
    </Link>
  );
}
