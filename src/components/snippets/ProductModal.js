import Image from "next/image";
import { XIcon } from "@heroicons/react/outline";

export default function ProductModal({
  selectedProduct,
  showModal,
  setShowModal,
}) {
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            ={" "}
            <div className="relative mx-auto my-6 " style={{ width: "900px" }}>
              <div className="relative flex flex-col items-end w-full bg-white border-0 rounded-lg shadow-lg outline-none item focus:outline-none">
                <button
                  className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-black uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  <XIcon className="block w-6 h-6 mt-4" />
                </button>
                <div className="relative flex-auto w-full p-6 ">
                  {showModal &&
                    selectedProduct.images &&
                    selectedProduct.images.map((img, key) => {
                      return (
                        <div
                          key={key}
                          className="relative w-full duration-150 cursor-pointer aspect-square group-hover:opacity-70 bg-slate-100"
                        >
                          <Image
                            src={img.node.originalSrc}
                            alt={"asfasfasf"}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-75"></div>
        </>
      ) : null}
    </>
  );
}
