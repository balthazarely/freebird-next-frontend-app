import ProductCard from "../../components/snippets/ProductCard";
import {
  getAllCollections,
  getProductsInCollection,
} from "../../services/collection.service";

export default function CollectionPage({ collection, name }) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-12">
        <h1 className="text-4xl font-bold ">{name.collection}</h1>

        <div className="grid grid-cols-1 gap-5 mt-6 md:grid-cols-3">
          {collection.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const collections = await getAllCollections();
  const collectionPaths = collections.map((item) => {
    const collection = String(item.node.handle);
    return {
      params: { collection },
    };
  });
  return {
    paths: collectionPaths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log(params, "params");
  const collection = await getProductsInCollection(params.collection);
  return {
    props: {
      name: params,
      collection,
    },
  };
}
