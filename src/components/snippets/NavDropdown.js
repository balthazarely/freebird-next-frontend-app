import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function NavDropdown() {
  const navLinks = [
    { name: "Boots", link: "/collections/boots" },
    { name: "Sandals", link: "/collections/sandal" },
    { name: "Men", link: "/collections/mens" },
    { name: "Baby", link: "/collections/baby" },
  ];
  return (
    <div className="ml-6">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Collections
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {navLinks.map((linkItem, idx) => {
                return (
                  <Menu.Item key={idx}>
                    {({ active }) => (
                      <Link href={linkItem.link}>
                        <button
                          className={`${
                            active ? "bg-gray-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-black hover:text-white`}
                        >
                          {linkItem.name}
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
