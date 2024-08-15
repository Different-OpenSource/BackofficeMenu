import React, { useState } from "react";
import { NumericFormat } from "react-number-format";

interface NumberInputProps {
  value: number;
  setValue: (value: number) => void;
  label?: string;
  placeholder?: string;
}

export default function NumberInput({
  value,
  setValue,
  label,
  placeholder,
}: NumberInputProps) {
  return (
    <div>
      {label && <label className="block text-sm font-medium">{label}</label>}
      <NumericFormat
        value={value}
        onValueChange={(values) => {
          const { floatValue } = values;
          setValue(floatValue ?? 0);
        }}
        thousandSeparator="."
        decimalSeparator=","
        prefix={"R$ "}
        className="text-sm rounded-lg block w-full p-2.5 bg-gray-200 border-blue-500 border-2 placeholder-gray-400 focus:border-blue-800 outline-none"
        placeholder={placeholder}
        decimalScale={2}
        fixedDecimalScale={true}
        allowNegative={false}
      />
    </div>
  );
}
