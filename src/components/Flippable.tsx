import { useState } from "react";

type FilppableProps = {
  className: string;
  front: React.ReactNode;
  back: React.ReactNode;
}

export default function Flippable({
  front,
  back,
  className
}: FilppableProps) {

  const [flipped, setFlipped] = useState<boolean>(false);

  return <div className={`select-none overflow-hidden ${className}`} onClick={() => setFlipped(!flipped)}>
    <div className={`${flipped && "hidden"} w-full h-full`}>
      {front}
    </div>
    <div className={`${!flipped && "hidden"} w-full h-full`}>
      {back}
    </div>
  </div>;
}