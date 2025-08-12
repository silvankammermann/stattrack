type ModalProps = {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return <>
    <div className="fixed pointer-events-auto flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-black/25">
      <div
        className="bg-white w-[80vw] rounded-xl p-3"
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
        }}>
        {children}
      </div>
    </div >
  </>
}