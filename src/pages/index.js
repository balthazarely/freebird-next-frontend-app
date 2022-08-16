import { getAllProducts } from "../services/product.services";
import Link from "next/link";
import Image from "next/image";

export default function Home({ products }) {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((product) => (
          <Link
            key={product.node.id}
            href={`/products/${product.node.handle}`}
            className="cursor-pointer"
          >
            <div>
              <div className="text-xl text-center font-bold">
                {product.node.title}
              </div>
              <div className="relative hover:opacity-80 duration-200  aspect-square cursor-pointer">
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
