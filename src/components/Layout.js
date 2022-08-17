import React from "react";
import Nav from "./sections/Nav";
import Navbar from "./sections/Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* <Navbar /> */}
      <Nav />
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}
