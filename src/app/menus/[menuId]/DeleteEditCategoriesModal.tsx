"use client";
import DeleteIcon from "@/assets/DeleteIcon";
import PencilIcon from "@/assets/PencilIcon";
import Modal from "@/components/Modal";
import { Category } from "@prisma/client";
import { Fragment, useState } from "react";
import EditCategoryNameModal from "./EditCategoryNameModal";
import APICaller from "@/utils/APICaller";
import toast from "react-hot-toast";
import ConfirmDecisionModal from "@/components/ConfirmDecisionModal";

export default function DeleteEditCategoriesModal({
  categories,
  isOpen,
  onClose,
  updateCategories,
}: {
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
  updateCategories: () => void;
}) {
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  async function deleteCategory() {
    try {
      const response = await APICaller(
        `/api/category?categoryId=${selectedCategory?.id}`,
        "DELETE"
      );
      if (response.success) {
        updateCategories();
        toast.success("Categoria excluída com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  }

  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-xl text-center">Categorias:</span>
          <div className="grid grid-cols-[3fr_1fr] gap-y-2">
            <div className="font-semibold">Categoria</div>
            <div className="font-semibold">Ações</div>
            {categories.map((category, i) => (
              <Fragment>
                <div className="">{category.name}</div>
                <div className="flex max-h-6 gap-3">
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsOpenConfirmDelete(true);
                    }}
                  >
                    <DeleteIcon className="text-red-600 cursor-pointer" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsOpenEdit(true);
                    }}
                  >
                    <PencilIcon />
                  </button>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </Modal>
      <EditCategoryNameModal
        category={selectedCategory!}
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        updateCategories={updateCategories}
      />
      <ConfirmDecisionModal
        title="Excluir categoria"
        message="Tem certeza que deseja excluir esta categoria?"
        isOpen={isOpenConfirmDelete}
        onClose={() => setIsOpenConfirmDelete(false)}
        onConfirm={() => deleteCategory()}
        onDecline={() => setIsOpenConfirmDelete(false)}
      />
    </Fragment>
  );
}
