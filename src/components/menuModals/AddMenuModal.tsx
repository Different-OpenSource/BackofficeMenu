"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { loaderToast } from "@/utils/loaderToast";
import { useState } from "react";

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

  async function createMenu() {
    loaderToast(
      () =>
        APICaller(`/api/menu`, "POST", {
          storeId: storeId,
          name: newMenuName,
        }),
      {
        loading: "Criando cardápio...",
        success: "Cardápio criado com sucesso!",
        error: "Erro ao criar cardápio!",
        onSuccess: () => {
          updateMenus();
          onClose();
        },
      }
    );
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
          <Button onClick={createMenu} style="primary" text="Criar" />
        </div>
      </div>
    </Modal>
  );
}
