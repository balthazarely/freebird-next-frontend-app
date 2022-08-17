import { ShopifyData } from "./shopify.services";

export async function getAllCollections() {
  const query = `
{
    collections(first: 250) {
      edges {
        node {
          title
          handle
        }
      }
    } 
  }
`;
  const response = await ShopifyData(query);
  const allCollections = response.collections.edges
    ? response.collections.edges
    : [];
  //   console.log(allCollections, "allCollections from the services");
  return allCollections;
}

export async function getProductsInCollection(handle) {
  const query = `
  {
    collectionByHandle(handle: "${handle}") {
        title
        products(first: 25) {
          edges {
            node {
              title
              id
              handle
              tags
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 5) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
            }
          }
        }
    }
  }`;

  const response = await ShopifyData(query);

  const allProductsInCollection = response.collectionByHandle.products.edges
    ? response.collectionByHandle.products.edges
    : [];

  return allProductsInCollection;
}
