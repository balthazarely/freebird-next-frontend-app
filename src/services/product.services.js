import { ShopifyData } from "../services/shopify.services";

export async function paginateAllProducts(cursor) {
  const query = `{
    products(first: 1 ${
      cursor ? "after:" + '"' + cursor + '"' : ""
    } query: "color=leopard") {
      pageInfo {
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
  
  `;

  const response = await ShopifyData(query);
  console.log(response);
  const slugs = response ? response : [];
  return slugs;
}

export async function getAllProducts() {
  const query = `{
    products(first: 100) {
      edges {
        node {
          handle
          id
          title
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
  }`;

  const response = await ShopifyData(query);
  const slugs = response.products.edges ? response.products.edges : [];
  return slugs;
}

export async function getAllProductsWithTag(
  paginateBy,
  cursor,
  color,
  gender,
  heel,
  priceGreaterThan,
  priceLessThan
) {
  const query = `{
    products(first: ${paginateBy}, ${
    cursor ? "after:" + '"' + cursor + '"' : ""
  } query: "${color} AND ${gender} AND ${heel} AND variants.price:>${priceGreaterThan} AND variants.price:<${priceLessThan}") {
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
  const slugs = response ? response : [];
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

/// THIS COULD BE USEFUl
// {
//   products(first: 50, query: "variants.price:>200") {
//     edges {
//       node {
//         title
//         tags
//         variantBySelectedOptions(selectedOptions: [{name: "Size", value: "11 "}]) {
//           id
//           title
//           priceV2 {
//             amount
//           }
//         }
//       }
//     }
//   }
// }

// {
//   products(first: 50, query:"variants.price:>200") {
//     edges {
//       node {
//         title
//         tags

//         variantBySelectedOptions(selectedOptions: [{name: "Size", value: "11"}]) {
//           id
//           title
//           priceV2 {
//             amount
//           }
//         }
//       }
//     }
//   }
// }

// {
//   products(first: 50, query: "variants.price:>350 AND variants.price:<600") {
//     edges {
//       node {
//         title
//         tags

//         variantBySelectedOptions(selectedOptions: [{name: "Size", value: "6 "}]) {
//           id
//           title
//           priceV2 {
//             amount
//           }
//         }
//       }
//     }
//   }
// }
