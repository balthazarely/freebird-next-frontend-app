import { ShopifyData } from "./shopify.services";

export async function testQuery(size) {
  const query = `{
    products(first: 200, query: "tag:Men") {
      edges {
        node {
          handle
          id
          title
          tags
          options {
            name
            values
            id
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          variantBySelectedOptions(selectedOptions: [{name: "Size", value: "${size}"}]) {
            id
            title
            priceV2 {
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
  `;

  const response = await ShopifyData(query);

  const product = response ? response : [];

  return product;
}

export async function getAllProductsTest(cursor) {
  const query = `{
      products(first: 3,  ${cursor ? "after:" + '"' + cursor + '"' : ""}) {
        pageInfo{
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              handle
              id
              title
              tags
              variants(first: 12){
                edges {
                  node {
                    title
                    availableForSale
                  }
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
      }`;

  const response = await ShopifyData(query);

  const product = response ? response : [];

  return product;
}
