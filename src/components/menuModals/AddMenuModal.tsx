"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddMenuModal({
  storeId,
  isOpen,
  onClose,
  updateMenus,
}: {
  storeId: string;
  isOpen: boolean;
  onClose: () => void;
  updateMenus: () => void;
}) {
  const [newMenuName, setNewMenuName] = useState("");

  async function editMenu() {
    try {
      const response = await APICaller(`/api/menu`, "POST", {
        storeId: storeId,
        name: newMenuName,
      });

      if (response.success) {
        updateMenus();
        onClose();
        toast.success("Cardápio criado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar cardápio:", error);
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl text-center">Criar Menu</span>
        <TextInput
          label="Nome do menu"
          placeholder="Segunda-feira"
          setValue={setNewMenuName}
          value={newMenuName}
          type="text"
        />
        <div className="self-end w-1/2">
          <Button onClick={editMenu} style="primary" text="Criar" />
        </div>
      </div>
    </Modal>
  );
}
