type DoubleCountingStatProps = {
  label: string;
  numberLeft: number;
  numberRight: number;
  onClickLeft?: () => void;
  onClickRight?: () => void;
}

export default function DoubleCountingStat({
  label,
  numberLeft,
  numberRight
}: DoubleCountingStatProps) {



  return <div className="flex rounded-sm bg-blue-100 text-blue-400">
    <p className="flex-1 text-center py-0.5">{label}</p>
    <button className="bg-green-300 text-green-800 rounded-l-sm text-center w-9 py-0.5">{numberLeft}</button>
    <button className="bg-red-300 text-red-800 rounded-r-sm text-center w-9 py-0.5">{numberRight}</button>
  </div>
}