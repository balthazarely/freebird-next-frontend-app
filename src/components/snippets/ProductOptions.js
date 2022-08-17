import React from "react";

export default function ProductOptions({
  name,
  values,
  selectedOptions,
  setOptions,
}) {
  return (
    <fieldset className="mt-3">
      <legend className="text-xl font-semibold ">{name}</legend>
      <div className="inline-flex flex-wrap items-center gap-4">
        {values.map((value) => {
          const id = `option-${name}-${value}`;
          const checked = selectedOptions[name] === value;

          return (
            <label key={id} htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option-${name}`}
                value={value}
                checked={checked}
                onChange={() => {
                  setOptions(name, value);
                }}
              />
              <div
                className={`group  cursor-pointer relative  rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase border-2 border-black   focus:outline-none sm:flex-1  ${
                  checked ? "bg-black text-white" : " "
                }`}
              >
                <span className="px-2">{value}</span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
