export default function FilterButtons({
  setGender,
  gender,
  color,
  setColor,
  heel,
  setHeel,
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
          onClick={() => setColor("color=brown")}
          className={`px-2 py-1 border-2 border-black rounded-md order-black ${
            color === "color=brown"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Brown
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
      <div>
        <button
          className="px-2 py-1 mt-12 text-white bg-red-800 rounded-md"
          onClick={() => {
            setColor("");
            setGender("");
            setHeel("");
          }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
