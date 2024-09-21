"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { Menu } from "@prisma/client";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { StoreContext } from "../../app/contexts/StoreContext";

export default function EditMenuModal({
  menu,
  isOpen,
  onClose,
  updateMenus,
}: {
  menu: Menu;
  isOpen: boolean;
  onClose: () => void;
  updateMenus: () => void;
}) {
  const [menuName, setMenuName] = useState(menu.name);

  async function editMenu() {
    try {
      const response = await APICaller(`/api/menu`, "PATCH", {
        id: menu.id,
        name: menuName,
      });

      if (response.success) {
        updateMenus();
        onClose();
        toast.success("Cardápio editado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao editar cardápio:", error);
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl text-center">Editar Menu</span>
        <TextInput
          label="Nome do menu"
          placeholder="Segunda-feira"
          setValue={setMenuName}
          value={menuName}
          type="text"
        />
        <div className="self-end w-1/2">
          <Button onClick={editMenu} style="primary" text="Editar" />
        </div>
      </div>
    </Modal>
  );
}
