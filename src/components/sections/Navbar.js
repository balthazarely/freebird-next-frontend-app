import Link from "next/link";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/cartContext";
import MiniCart from "./MiniCart";

export default function Navbar() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext);

  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });

  return (
    <div className="sticky top-0 z-20 w-full px-12 bg-white border-b shadow-xl py-7 ">
      <div className="flex justify-between max-w-full mx-auto ">
        <div className="flex">
          <Link href="/">
            <div className="text-2xl font-bold tracking-wider cursor-pointer ">
              FREEBIRD
            </div>
          </Link>
        </div>
        <a
          className="font-bold cursor-pointer text-md"
          onClick={() => setCartOpen(!cartOpen)}
        >
          Cart ({cartQuantity})
        </a>
        <MiniCart cart={cart} />
      </div>
    </div>
  );
}
