import { ShopifyData } from "./shopify.services";

export async function getAllCollections() {
  const query = ` {
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
  return allCollections;
}

export async function getAllProductCollections() {
  const query = ` {
    collections(first: 250, query: "title:FREEBIRD-*") {
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
              description
              variants(first: 25) {
                edges {
                  node {
                    selectedOptions {
                      name
                      value
                    }
                    image {
                      originalSrc
                      altText
                    }
                    title
                    id
                    availableForSale
                    priceV2 {
                      amount
                    }
                  }
                }
              }
              images(first: 8) {
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
