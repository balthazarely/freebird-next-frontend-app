import { getAllProducts } from "../services/product.services";
import PageHero from "../components/snippets/PageHero";
import ProductCard from "../components/snippets/ProductCard";

export default function Home({ products }) {
  return (
    <>
      <PageHero />
      <div className="px-6 mx-auto max-w-7xl">
        <h2 className="mb-12 text-4xl font-extrabold text-gray-900">
          All Products
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </>
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
