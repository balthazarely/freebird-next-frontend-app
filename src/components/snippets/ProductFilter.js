import Filter from "./Filter";

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
      <div className="mb-1 text-lg font-bold">Color</div>
      <div className="flex flex-wrap gap-1 ">
        {tags &&
          tags.map((item, idx) => (
            <Filter
              key={idx}
              item={item}
              filterBy="color"
              filerByTag={filerByTag}
              setTagFilter={setTagFilter}
            />
          ))}
      </div>
      <div className="mt-4 mb-1 text-lg font-bold">Style</div>
      <div className="flex flex-wrap gap-1 ">
        {tags &&
          tags.map((item, idx) => (
            <Filter
              key={idx}
              item={item}
              filterBy="style"
              filerByTag={filerByTag}
              setTagFilter={setTagFilter}
            />
          ))}
      </div>
      <div className="mt-4 mb-1 text-lg font-bold">Heel Size</div>
      <div className="flex flex-wrap gap-1 ">
        {tags &&
          tags.map((item, idx) => (
            <Filter
              key={idx}
              item={item}
              filterBy="heel"
              filerByTag={filerByTag}
              setTagFilter={setTagFilter}
            />
          ))}
      </div>
      <div className="mt-4 mb-1 text-lg font-bold">Shoe Size</div>
      <div className="flex flex-wrap gap-1 ">
        {sizes &&
          sizes.map((size, idx) => (
            <div
              key={idx}
              onClick={() => setSizeFilter(size)}
              className={` capitalize border-2 border-gray-700 cursor-pointer hover:text-white hover:bg-gray-700 w-10 flex justify-center rounded-md px-2 text-sm py-0.5 ${
                filterBySize.includes(size)
                  ? "bg-gray-700 text-white"
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
