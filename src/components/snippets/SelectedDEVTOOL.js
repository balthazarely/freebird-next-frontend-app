import React from "react";

export default function SelectedDEVTOOL({ selectedVariant }) {
  // console.log(selectedVariant);
  return (
    <div className="w-full px-2 py-6 mb-6 bg-slate-200">
      <div>
        variant selected:{" "}
        <span className="font-bold bg-white">
          {selectedVariant.variantTitle}
        </span>
      </div>
    </div>
  );
}
