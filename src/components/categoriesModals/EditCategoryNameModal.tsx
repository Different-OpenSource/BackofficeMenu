"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditCategoryNameModal({
  category,
  isOpen,
  onClose,
  updateCategories,
}: {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
  updateCategories: () => void;
}) {
  const [newCategoryName, setNewCategoryName] = useState(category.name);

  useEffect(() => {
    setNewCategoryName(category.name);
  }, [category]);

  async function editCategory() {
    try {
      const response = await APICaller(`/api/category`, "PATCH", {
        id: category.id,
        name: newCategoryName,
      });

      if (response.success) {
        updateCategories();
        onClose();
        toast.success("Categoria editada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl text-center">
          Editar categoria
        </span>
        <TextInput
          label="Nome da categoria"
          placeholder="Sobremesas"
          setValue={setNewCategoryName}
          value={newCategoryName}
          type="text"
        />
        <div className="self-end w-1/2">
          <Button onClick={editCategory} style="primary" text="Editar" />
        </div>
      </div>
    </Modal>
  );
}
