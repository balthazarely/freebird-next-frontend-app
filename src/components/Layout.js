import React from "react";
import Nav from "./sections/Nav";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main>{children}</main>
    </div>
  );
}
