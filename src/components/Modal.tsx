import { Fragment } from "react";
import Portal from "./Portal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return <Fragment />;
  }

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={() => {
          onClose();
        }}
      >
        <div
          className="bg-white rounded-lg shadow-lg p-4 w-96"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}
