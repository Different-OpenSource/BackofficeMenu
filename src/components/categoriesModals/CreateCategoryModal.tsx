"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateCategoryModal({
  menuId,
  isOpen,
  onClose,
  updateCategories,
}: {
  menuId: string;
  isOpen: boolean;
  onClose: () => void;
  updateCategories: () => void;
}) {
  const [newCategoryName, setNewCategoryName] = useState("");

  async function createCategory() {
    if (!newCategoryName) {
      return;
    }
    try {
      const requestData = { name: newCategoryName, menuId: menuId };
      const response = await APICaller("/api/category", "POST", requestData);
      if (response.success) {
        updateCategories();
        onClose();
        setNewCategoryName("");
        toast.success("Categoria criada com sucesso!");
      }
      response.error && console.error(response.error);
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl text-center">
          Criar nova categoria
        </span>
        <TextInput
          label="Nome da categoria"
          placeholder="Sobremesas"
          setValue={setNewCategoryName}
          value={newCategoryName}
          type="text"
        />
        <div className="self-end w-1/2">
          <Button onClick={createCategory} style="primary" text="Criar" />
        </div>
      </div>
    </Modal>
  );
}
