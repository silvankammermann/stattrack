import { useState } from "react";

type ToggleProps = {
  options: [string, string];
  onToggle?: (newVal: string, prevVal: string) => void;
}

export default function Toggle({ options, onToggle }: ToggleProps) {
  const [current, setCurrent] = useState<string>(options[0]);
  return <>
    <div className="grid grid-cols-2 bg-gray-100 rounded-lg">
      {options.map((option, i) =>
        <button
          key={i}
          onClick={(e) => {
            e.preventDefault();
            if (option == current) return;
            if (onToggle) onToggle(option, current);
            setCurrent(option);
          }}
          className={`
          ${option == current && "bg-green-200 rounded-lg text-green-700"}
          px-4 py-1
          `}>
          {option}
        </button>)}
    </div>
  </>
}