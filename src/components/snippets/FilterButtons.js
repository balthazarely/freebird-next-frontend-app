import { useState } from "react";

export default function FilterButtons({
  setGender,
  gender,
  color,
  setColor,
  heel,
  setHeel,
  setPriceGreaterThan,
  setPiceLessThan,
  priceGreaterThan,
  priceLessThan,
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 p-2 mb-6 ">
        <button
          onClick={() => setGender("")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            gender === "" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setGender("gender=woman")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            gender === "gender=woman"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Women
        </button>
        <button
          onClick={() => setGender("gender=men")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            gender === "gender=men"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Men
        </button>
      </div>

      <div>COLOR:</div>
      <div className="flex flex-wrap gap-2 p-2 mb-6 ">
        <button
          onClick={() => setColor("")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            color === "" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setColor("color=cognac")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            color === "color=cognac"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Cognac
        </button>
        <button
          onClick={() => setColor("color=black")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            color === "color=black"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Black
        </button>
        <button
          onClick={() => setColor("color=tan")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            color === "color=tan"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Tan
        </button>
        <button
          onClick={() => setColor("color=leopard")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            color === "color=leopard"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Leopard
        </button>
        <button
          onClick={() => setColor("color=suede")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            color === "color=suede"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Suede
        </button>
      </div>
      <div>Heel:</div>
      <div className="flex flex-wrap gap-2 p-2 mb-6 ">
        <button
          onClick={() => setHeel("")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            heel === "" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setHeel("heel=small")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            heel === "heel=small"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Small
        </button>
        <button
          onClick={() => setHeel("heel=large")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            heel === "heel=large"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Large
        </button>
      </div>

      <div>Price:</div>
      <div className="flex flex-wrap gap-2 p-2 mb-6 ">
        <div className="flex items-center justify-start gap-2">
          <div className="text-sm">Greater Than</div>
          <input
            type="text"
            className="w-16 border-2 border-black"
            value={priceGreaterThan}
            onChange={(e) => setPriceGreaterThan(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-start gap-2">
          <div className="text-sm">Less Than</div>
          <input
            type="text"
            className="w-16 border-2 border-black"
            value={priceLessThan}
            onChange={(e) => setPiceLessThan(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="px-2 py-1 text-white bg-red-800 rounded-md"
          onClick={() => {
            setColor("");
            setGender("");
            setHeel("");
            setPiceLessThan(1000);
            setPriceGreaterThan(0);
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
