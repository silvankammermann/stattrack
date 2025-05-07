import { useState } from "react";

type ToggleProps = {
  options: [string, string];
  onToggle?: (newVal: string, prevVal: string) => void;
}

export default function Toggle({ options, onToggle }: ToggleProps) {
  const [current, setCurrent] = useState<string>(options[0]);
  return <>
    <div>
      {options.map((option, i) =>
        <button
          key={i}
          onClick={(e) => {
            e.preventDefault();
            if (option == current) return;
            if (onToggle) onToggle(option, current);
            setCurrent(option);
          }}
          className={option == current ? "selected" : ""}>
          {option}
        </button>)}
    </div>
  </>
}