import React from "react";

export default function SelectedDEVTOOL({
  selectedVariant,
  selectedOptions,
  selecteVariantQuantity,
}) {
  // console.log(selectedOptions, "selectedOptions");
  return (
    <div className="w-full px-2 py-6 mt-6 mb-6 bg-slate-200">
      <div>
        selected ID:{" "}
        <span className="font-bold bg-white">{selectedVariant.id}</span>
      </div>
      <div>
        variant selected:{" "}
        <span className="font-bold bg-white">
          {selectedVariant.variantTitle}
        </span>
      </div>
      <div>
        quantity selected:{" "}
        <span className="font-bold bg-white">
          {selectedVariant.variantQuantity}
        </span>
      </div>
      <div>
        selecteVariantQuantity:{" "}
        <span className="font-bold bg-white">{selecteVariantQuantity}</span>
      </div>
    </div>
  );
}
