import Button from "./Button";
import Modal from "./Modal";

export default function ConfirmDecisionModal({
  title,
  message,
  onConfirm,
  onDecline,
  isOpen,
  onClose,
}: {
  title: string;
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onDecline: () => void;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl text-center">{title}</span>
        <span className="text-center">{message}</span>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              onDecline();
              onClose();
            }}
            style="primary"
            text="Não"
          />
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style="outline"
            text="Sim"
          />
        </div>
      </div>
    </Modal>
  );
}
