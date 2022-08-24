import React from "react";

export default function SelectedProductFilter({
  filerByTag,
  filterBySize,
  setTagFilter,
  setSizeFilter,
  clearFilters,
}) {
  return (
    <div className="mt-12">
      {filerByTag.length !== 0 || filterBySize.length !== 0 ? (
        <div className="text-lg font-bold">Selected Filters</div>
      ) : (
        ""
      )}

      {filerByTag.map((filter) => (
        <div className="flex items-center justify-between px-2 py-1 mb-2 capitalize bg-gray-200">
          <div>{filter.split(":")[1].split("=").join(" : ")} </div>
          <div
            onClick={() => setTagFilter(filter)}
            className="text-sm font-bold cursor-pointer"
          >
            X
          </div>
        </div>
      ))}
      {filterBySize.map((filter) => (
        <div className="flex items-center justify-between px-2 py-1 mb-2 capitalize bg-gray-200">
          <div>Size : {filter} </div>
          <div
            onClick={() => setSizeFilter(filter)}
            className="text-sm font-bold cursor-pointer"
          >
            X
          </div>
        </div>
      ))}
      {filerByTag.length !== 0 || filterBySize.length !== 0 ? (
        <button
          onClick={() => clearFilters()}
          className="w-full p-1 text-lg text-white bg-red-700 rounded-lg hover:bg-red-900"
        >
          Clear Selection
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
