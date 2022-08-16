import { getAllProducts } from "../services/product.services";
import Link from "next/link";
import Image from "next/image";

export default function Home({ products }) {
  return (
    <div className="px-6 mx-auto max-w-7xl">
      <h2 className="mb-6 text-2xl font-extrabold text-gray-900">Products</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.node.id}
            href={`/products/${product.node.handle}`}
            className="cursor-pointer"
          >
            <div>
              <div className="text-xl font-bold text-center">
                {product.node.title}
              </div>
              <div className="relative duration-200 cursor-pointer hover:opacity-80 aspect-square">
                <Image
                  src={product.node.images.edges[0].node.originalSrc}
                  alt={product.node.images.edges[0].node.altText}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const products = await getAllProducts();

  return {
    props: {
      products,
    },
  };
}
