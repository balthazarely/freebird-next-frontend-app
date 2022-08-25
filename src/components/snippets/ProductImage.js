import Image from "next/image";

export default function ProductImage({
  selectedProduct,
  openModalAndScrollToImage,
}) {
  return (
    <div className="">
      <div className="hidden grid-cols-2 gap-6 md:grid">
        {selectedProduct &&
          selectedProduct.images &&
          selectedProduct.images.map((image, idx) => (
            <div
              className="relative w-full aspect-square bg-slate-100"
              key={idx}
              onClick={() => openModalAndScrollToImage(image)}
            >
              <Image
                src={image.node.originalSrc}
                alt="imagehere"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
      </div>
      <div className="block md:hidden">
        {selectedProduct &&
          selectedProduct.images &&
          selectedProduct.images.slice(0, 1).map((item, idx) => (
            <div
              className="relative w-full aspect-square bg-slate-100"
              key={idx}
            >
              <Image
                key={idx}
                src={item.node.originalSrc}
                alt="imagehere"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
