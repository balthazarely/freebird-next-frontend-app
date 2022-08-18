export default function ProductsFormDEVTOOLS({
  selectedOptions,
  selectedProduct,
}) {
  return (
    <div>
      <div className="px-2 py-6 mt-6 mb-6 bg-purple-200 w-96">
        <div className="text-xl font-bold">Selected Option</div>
        <div>
          Product/Variant:{" "}
          <span className="font-bold ">{selectedOptions.variantTitle}</span>
        </div>
        <div>
          Size: <span className="font-bold ">{selectedOptions.size}</span>
        </div>
      </div>
      {selectedProduct && (
        <div className="px-2 py-6 mt-6 mb-6 bg-green-200 w-96">
          <div className="text-xl font-bold">Selected Product</div>
          <div>
            selected name:{" "}
            <span className="font-bold">{selectedProduct.variantTitle}</span>
          </div>
          <div>
            selected size:{" "}
            <span className="font-bold">{selectedProduct.size}</span>
          </div>
          <div>
            selected color:{" "}
            <span className="font-bold">{selectedProduct.color}</span>
          </div>
          <div>
            selected id: <span className="font-bold">{selectedProduct.id}</span>
          </div>
        </div>
      )}
    </div>
  );
}
