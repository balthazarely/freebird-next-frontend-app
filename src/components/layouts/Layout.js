import React from "react";
import Navbar from "../sections/Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}
