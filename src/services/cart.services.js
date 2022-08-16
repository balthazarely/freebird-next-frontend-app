import { ShopifyData } from "../services/shopify.services";

export async function createCheckout(id, quantity) {
  const query = `
  mutation {
    checkoutCreate(input: {
      lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
    }) {
      checkout {
        id
        webUrl
      }
    }
  }`;

  const response = await ShopifyData(query);

  const checkout = response.checkoutCreate.checkout
    ? response.checkoutCreate.checkout
    : [];

  return checkout;
}

export async function updateCheckout(id, lineItems) {
  const lineItemsObject = lineItems.map((item) => {
    return `{
        variantId: "${item.id}",
        quantity:  ${item.variantQuantity}
      }`;
  });

  const query = `
    mutation {
      checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
        checkout {
          id
          webUrl
          lineItems(first: 25) {
            edges {
              node {
                id
                title
                quantity
              }
            }
          }
        }
      }
    }`;

  const response = await ShopifyData(query);

  const checkout = response.checkoutLineItemsReplace.checkout
    ? response.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}

export async function addToCart(newItem) {
  setCartOpen(true);

  if (cart.length === 0) {
    setCart([newItem]);

    const checkout = await createCheckout(newItem.id, newItem.variantQuantity);

    setCheckoutId(checkout.id);
    setCheckoutUrl(checkout.webUrl);

    localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]));
  } else {
    let newCart = [];
    let added = false;

    cart.map((item) => {
      if (item.id === newItem.id) {
        item.variantQuantity++;
        newCart = [...cart];
        added = true;
      }
    });

    if (!added) {
      newCart = [...cart, newItem];
    }

    setCart(newCart);
    const newCheckout = await updateCheckout(checkoutId, newCart);
    localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]));
  }
}
