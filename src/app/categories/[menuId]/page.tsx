"use client";
import APICaller from "@/utils/APICaller";
import { useAuthRedirect } from "@/utils/isAuthenticated";
import { Category } from "@prisma/client";
import { Fragment, useEffect, useState } from "react";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import PencilIcon from "@/assets/PencilIcon";
import DeleteIcon from "@/assets/DeleteIcon";
import ConfirmDecisionModal from "@/components/ConfirmDecisionModal";
import EditCategoryNameModal from "./categoriesModals/EditCategoryNameModal";
import toast from "react-hot-toast";

interface MenuItemParams {
  menuId: string;
}
export default function MenuItem({ params }: { params: MenuItemParams }) {
  const isAuth = useAuthRedirect();
  const [isOpenEditCategory, setIsOpenEditCategory] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [categories, setCategories] = useState<Category[]>([]);

  async function getCategories() {
    try {
      const response = await APICaller(
        `/api/categories?menuId=${params.menuId}`,
        "GET"
      );
      setCategories(response.categories);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  }

  async function deleteCategory() {
    try {
      const response = await APICaller(
        `/api/category?categoryId=${selectedCategory?.id}`,
        "DELETE"
      );
      if (response.success) {
        getCategories();
        toast.success("Categoria excluída com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return isAuth ? (
    <Fragment>
      <div className="w-full h-full flex relative p-4">
        <div className="flex flex-col gap-4 overflow-hidden flex-1 items-center">
          <ResponsiveGrid childWidth={300}>
            {categories.map((category) => (
              <div className="w-[300px] bg-white rounded-lg shadow-lg p-4 flex justify-between items-center gap-4 border-2 overflow-hidden whitespace-nowrap">
                {category.name}
                <div className="gap-2 flex">
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsOpenEditCategory(true);
                    }}
                  >
                    <PencilIcon />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsOpenConfirmDelete(true);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </ResponsiveGrid>
        </div>
      </div>
      {selectedCategory && (
        <Fragment>
          <EditCategoryNameModal
            category={selectedCategory}
            isOpen={isOpenEditCategory}
            onClose={() => setIsOpenEditCategory(false)}
            updateCategories={() => getCategories()}
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
  ) : (
    <Fragment />
  );
}
