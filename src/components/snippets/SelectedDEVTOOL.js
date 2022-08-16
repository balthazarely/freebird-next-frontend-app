import React from "react";

export default function SelectedDEVTOOL({
  selectedVariant,
  selectedOptions,
  selecteVariantQuantity,
}) {
  console.log(selectedOptions, "selectedOptions");
  return (
    <div>
      <div className="w-full px-2 py-6 mb-6 bg-slate-200">
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
      {/* <div className="w-full px-2 py-6 mb-6 bg-red-200">
        <div>
          size option:{" "}
          <span className="font-bold bg-white">{selectedOptions.Size}</span>
        </div>
        <div>
          color selected:{" "}
          <span className="font-bold bg-white">{selectedOptions.Color}</span>
        </div>
      </div> */}
    </div>
  );
}
