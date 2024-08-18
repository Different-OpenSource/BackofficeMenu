"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { Menu } from "@prisma/client";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { StoreContext } from "../contexts/StoreContext";

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
  const [newMenuName, setNewMenuName] = useState(menu.name);
  
  async function editMenu() {
    try {
      const response = await APICaller(`/api/menu`, "PATCH", {
        id: menu.id,
        name: newMenuName,
      });

      if (response.success) {
        updateMenus();
        onClose();
        toast.success("Menu editado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao editar menu:", error);
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl text-center">Editar Menu</span>
        <TextInput
          label="Nome do menu"
          placeholder="Segunda-feira"
          setValue={setNewMenuName}
          value={newMenuName}
          type="text"
        />
        <div className="self-end w-1/2">
          <Button onClick={editMenu} style="primary" text="Editar" />
        </div>
      </div>
    </Modal>
  );
}
