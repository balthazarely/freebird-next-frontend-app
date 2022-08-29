export default function Filter({ item, filterBy, filerByTag, setTagFilter }) {
  if (item.split(":")[1].split("=")[0] === filterBy) {
    return (
      <div
        onClick={() => setTagFilter(item)}
        className={` capitalize border-2 border-gray-700 cursor-pointer hover:text-white hover:bg-gray-700  rounded-md px-2 text-sm py-0.5 ${
          filerByTag.includes(item)
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-800"
        }`}
      >
        {item.split("=")[1]}
      </div>
    );
  }
}
