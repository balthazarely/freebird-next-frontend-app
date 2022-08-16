import Image from "next/image";
import Link from "next/link";
import {
  getAllCollections,
  getProductsInCollection,
} from "../../services/collection.service";

export default function CollectionPage({ collection, name }) {
  console.log(name, "THIS IS THE name 🎯");
  console.log(collection, "THIS IS THE collection 🎯");

  return (
    <div className="mx-auto max-w-7xl">
      <div className="px-12">
        <h1 className="text-4xl font-bold ">{name.collection}</h1>
        {collection.map((product, idx) => {
          return <div key={idx}> {product.node.title} </div>;
        })}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {collection.map((product) => (
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
