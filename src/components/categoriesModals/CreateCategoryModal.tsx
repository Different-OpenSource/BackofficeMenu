"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { loaderToast } from "@/utils/loaderToast";
import { useState } from "react";

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
    loaderToast(
      () =>
        APICaller("/api/category", "POST", {
          name: newCategoryName,
          menuId: menuId,
        }),
      {
        loading: "Criando categoria...",
        success: "Categoria criada com sucesso!",
        error: "Erro ao criar categoria!",
        onSuccess: () => {
          updateCategories();
          onClose();
          setNewCategoryName("");
        },
      }
    );
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
