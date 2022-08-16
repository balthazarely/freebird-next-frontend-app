import { ProductForm } from "../../components/snippets/ProductForm";
import { getAllProducts, getProduct } from "../../services/product.services";

export default function ProductPage({ product }) {
  // console.log(product);
  return (
    <div className="mx-auto max-w-7xl">
      <ProductForm product={product} />
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
