import React from "react";

export default function ProductFilter({
  setTagFilter,
  setSizeFilter,
  filerByTag,
  tags,
  sizes,
  filterBySize,
}) {
  return (
    <>
      <div className="mb-2 text-xl font-bold">Color</div>
      <div className="flex flex-wrap gap-1 ">
        {tags &&
          tags.map((item, idx) => {
            if (item.split(":")[1].split("=")[0] === "color") {
              return (
                <div
                  onClick={() => setTagFilter(item)}
                  key={idx}
                  className={` capitalize border-2 border-black cursor-pointer hover:text-white hover:bg-gray-800  rounded-md px-2 py-1 ${
                    filerByTag.includes(item)
                      ? "bg-gray-800 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {item.split("=")[1]}
                </div>
              );
            }
          })}
      </div>
      <div className="mt-8 mb-2 text-xl font-bold">Style</div>
      <div className="flex flex-wrap gap-1 ">
        {tags &&
          tags.map((item, idx) => {
            if (item.split(":")[1].split("=")[0] === "style") {
              return (
                <div
                  onClick={() => setTagFilter(item)}
                  key={idx}
                  className={` capitalize border-2 border-black cursor-pointer hover:text-white hover:bg-gray-800  rounded-md px-2 py-1 ${
                    filerByTag.includes(item)
                      ? "bg-gray-800 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {item.split("=")[1]}
                </div>
              );
            }
          })}
      </div>
      <div className="mt-8 mb-2 text-xl font-bold">Heel Size</div>
      <div className="flex flex-wrap gap-1 ">
        {tags &&
          tags.map((item, idx) => {
            if (item.split(":")[1].split("=")[0] === "heel") {
              return (
                <div
                  onClick={() => setTagFilter(item)}
                  key={idx}
                  className={` capitalize border-2 border-black cursor-pointer hover:text-white hover:bg-gray-800  rounded-md px-2 py-1 ${
                    filerByTag.includes(item)
                      ? "bg-gray-800 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {item.split("=")[1]}
                </div>
              );
            }
          })}
      </div>
      <div className="mt-8 mb-2 text-xl font-bold">Shoe Size</div>
      <div className="flex flex-wrap gap-1 ">
        {sizes &&
          sizes.map((size, idx) => (
            <div
              key={idx}
              onClick={() => setSizeFilter(size)}
              className={` capitalize border-2 border-black cursor-pointer hover:text-white hover:bg-gray-800 w-10 flex justify-center rounded-md px-2 py-1 ${
                filterBySize.includes(size)
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
            >
              {size}
            </div>
          ))}
      </div>
    </>
  );
}
