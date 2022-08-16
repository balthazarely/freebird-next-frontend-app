import { ShopifyData } from "../services/shopify.services";

export async function getAllProducts() {
  const query = `{
    products(first: 100) {
      edges {
        node {
          handle
          id
          title
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
  }`;

  const response = await ShopifyData(query);
  const slugs = response.products.edges ? response.products.edges : [];
  return slugs;
}

export async function getProduct(handle) {
  const query = `
  {
    productByHandle(handle: "${handle}") {
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
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
    }
  }`;

  const response = await ShopifyData(query);

  const product = response.productByHandle ? response.productByHandle : [];

  return product;
}
