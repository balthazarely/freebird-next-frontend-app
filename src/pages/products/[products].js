import ProductsForm from "../../components/snippets/ProductsForm";
import {
  getAllProductCollections,
  getProductsInCollection,
} from "../../services/collection.service";

export default function productsPage({ products, name }) {
  return (
    <div className="mx-auto max-w-7xl">
      <ProductsForm products={products} name={name} />
    </div>
  );
}
export async function getStaticPaths() {
  const products = await getAllProductCollections();
  const paths = products.map((item) => {
    const products = String(item.node.handle);

    return {
      params: { products },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const products = await getProductsInCollection(params.products);
  return {
    props: {
      name: params,
      products,
    },
  };
}
