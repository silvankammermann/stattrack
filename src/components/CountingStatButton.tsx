import { ReactNode } from "react";

type CountingStatButtonProps = {
  onClick: () => void;
  children: ReactNode
}

export default function CountingStatButton({
  onClick,
  children
}: CountingStatButtonProps) {
  return <>
    <button
      className="bg-orange-200 text-orange-400 rounded-sm text-center w-16 py-0.5"
      onClick={onClick}
    >
      {children}
    </button>
  </>;
}