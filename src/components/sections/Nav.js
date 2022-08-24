import { useContext } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import MiniCart from "./MiniCart";
import { CartContext } from "../../context/cartContext";
import Image from "next/image";

const navigation = [
  { name: "Boots", href: "/collections/boots" },
  { name: "Men", href: "/collections/mens" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const router = useRouter();
  const currentRoute = router.query.collection
    ? `/collections/${router.query.collection.toLowerCase()}`
    : "";

  const { cart, cartOpen, setCartOpen } = useContext(CartContext);

  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });

  return (
    <Disclosure as="nav" className="bg-white ">
      {({ open }) => (
        <>
          <div className="px-2 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Link href="/">
                    <div className="text-2xl font-bold tracking-wider cursor-pointer ">
                      <div
                        style={{
                          width: "250px",
                          height: "100px",
                          position: "relative",
                        }}
                      >
                        <Image
                          alt="Mountains"
                          src="/Freebird-logo.webp"
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      {/* <Image
                        src="/Freebird-logo.webp"
                        width={100}
                        height={auto}
                        alt="heroimage"
                      /> */}
                    </div>
                  </Link>
                </div>
                <div className="items-center hidden sm:flex sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          currentRoute === item.href.toLowerCase()
                            ? "bg-gray-900 text-white"
                            : "text-black hover:bg-gray-300",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <a
                  className="flex gap-1 font-bold cursor-pointer text-md"
                  onClick={() => setCartOpen(!cartOpen)}
                >
                  <ShoppingBagIcon
                    className="block w-6 h-6"
                    aria-hidden="true"
                  />
                  ({cartQuantity})
                </a>
                <MiniCart cart={cart} />
              </div>
            </div>
          </div>
          <Disclosure.Panel className="absolute z-50 w-full h-screen bg-white sm:hidden{">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    currentRoute === item.href.toLowerCase()
                      ? "bg-gray-900 text-white"
                      : "text-black hover:bg-gray-300",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
