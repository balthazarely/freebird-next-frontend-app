import ProductCard from "../components/snippets/ProductCard";
import { useEffect, useState } from "react";
import { getAllProductsTest } from "../services/test.querys";
import ProductFilter from "../components/snippets/ProductFilter";
import SelectedProductFilter from "../components/snippets/SelectedProductFilter";
import Loader from "../components/snippets/Loader";
import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-hidden  max-w-screen">
      <div
        className="pt-2"
        style={{ position: "relative", width: "100vw", height: "50.66vw" }}
      >
        <Image src="/hero-image.webp" layout="fill" objectFit="cover" />
      </div>
      <div
        className="pt-2"
        style={{ position: "relative", width: "100vw", height: "50.66vw" }}
      >
        <Image
          src="/contest-stagecoach-hero.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        className="pt-2"
        style={{ position: "relative", width: "100vw", height: "50.66vw" }}
      >
        <Image
          src="/freebird-cowboy-hero.png"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}

// export async function getStaticProps() {
//   const products = await getAllProducts();

//   return {
//     props: {
//       products,
//     },
//   };
// }
