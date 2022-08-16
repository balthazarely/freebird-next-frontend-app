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
    <div className="w-full py-7 px-12 shadow-xl border-b sticky top-0 z-20 bg-white ">
      <div className=" max-w-full mx-auto flex justify-between">
        {/* <div className="flex uppercase font-bold text-lg  tracking-wider">
          <div className="px-6">Women</div>
          <div className="px-6">Men</div>
          <div className="px-6">Baby</div>
        </div> */}
        <Link href="/">
          <div className=" font-bold text-2xl  cursor-pointer tracking-wider">
            FREEBIRD
          </div>
        </Link>
        <a
          className="text-md font-bold cursor-pointer"
          onClick={() => setCartOpen(!cartOpen)}
        >
          Cart ({cartQuantity})
        </a>
        <MiniCart cart={cart} />
      </div>
    </div>
  );
}
