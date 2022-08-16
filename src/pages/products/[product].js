import { ProductForm } from "../../components/snippets/ProductForm";
import { getAllProducts, getProduct } from "../../services/product.services";
import Image from "next/image";

export default function ProductPage({ product }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative w-full aspect-square">
          <Image
            src={product.images.edges[0].node.originalSrc}
            alt={"imagehere"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <ProductForm product={product} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const products = await getAllProducts();
  const paths = products.map((item) => {
    const product = String(item.node.handle);

    return {
      params: { product },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await getProduct(params.product);

  return {
    props: {
      product,
    },
  };
}
