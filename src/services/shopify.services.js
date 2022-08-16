import axios from "axios";
const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

export async function ShopifyData(query) {
  const URL = `https://${domain}/api/2021-07/graphql.json`;

  try {
    const data = axios({
      url: URL,
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        query: query,
      },
    }).then((response) => response.data.data);

    return data;
  } catch (error) {
    throw new Error("Products not fetched");
  }
}
