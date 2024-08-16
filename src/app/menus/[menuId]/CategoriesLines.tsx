"use client";
import DeleteIcon from "@/assets/DeleteIcon";
import PencilIcon from "@/assets/PencilIcon";
import { Category } from "@prisma/client";
import { Fragment, useState } from "react";
import EditCategoryNameModal from "./categoriesModals/EditCategoryNameModal";
import APICaller from "@/utils/APICaller";
import toast from "react-hot-toast";
import ConfirmDecisionModal from "@/components/ConfirmDecisionModal";

export default function CategoriesLines({
  categories,
  isOpen,
  updateCategories,
}: {
  categories: Category[];
  isOpen: boolean;
  updateCategories: () => void;
}) {
  const [isOpenEditCategory, setIsOpenEditCategory] = useState(false);
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
      {isOpen && (
        <div className="grid grid-cols-[3fr_1fr] gap-y-2">
          <div className="font-semibold">Categoria</div>
          <div className="font-semibold">Ações</div>
          {categories.map((category, i) => (
            <Fragment>
              <div>{category.name}</div>
              <div className="flex max-h-6 gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsOpenConfirmDelete(true);
                  }}
                >
                  <DeleteIcon className="text-red-600 cursor-pointer" />
                </button>
                <button onClick={() => setSelectedCategory(category)}>
                  <PencilIcon />
                </button>
              </div>
            </Fragment>
          ))}
        </div>
      )}
      {selectedCategory && (
        <Fragment>
          <EditCategoryNameModal
            category={selectedCategory}
            isOpen={isOpenEditCategory}
            onClose={() => setIsOpenEditCategory(true)}
            updateCategories={updateCategories}
          />
          <ConfirmDecisionModal
            title="Excluir categoria"
            message="Tem certeza que deseja excluir esta categoria?"
            isOpen={isOpenConfirmDelete}
            onClose={() => setIsOpenConfirmDelete(false)}
            onConfirm={() => deleteCategory()}
            onDecline={() => {}}
          />
        </Fragment>
      )}
    </Fragment>
  );
}
