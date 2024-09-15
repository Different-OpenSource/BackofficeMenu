"use client";
import APICaller from "@/utils/APICaller";
import { Category, Menu } from "@prisma/client";
import { Fragment, useEffect, useState } from "react";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import PencilIcon from "@/assets/PencilIcon";
import DeleteIcon from "@/assets/DeleteIcon";
import ConfirmDecisionModal from "@/components/ConfirmDecisionModal";
import EditCategoryNameModal from "./categoriesModals/EditCategoryNameModal";
import toast from "react-hot-toast";
import CreateCategoryModal from "./categoriesModals/CreateCategoryModal";
import ChevronLeftIcon from "@/assets/ChevronLeftIcon";
import { useRouter } from "next/navigation";

interface MenuItemParams {
  menuId: string;
}
export default function MenuItem({ params }: { params: MenuItemParams }) {
  const router = useRouter();
  const [isOpenEditCategory, setIsOpenEditCategory] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenCreateCategory, setIsOpenCreateCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [menu, setMenu] = useState<Menu | null>(null);

  async function getMenu() {
    try {
      const response = await APICaller(
        `/api/menu?menuId=${params.menuId}`,
        "GET"
      );
      setMenu(response.menu);
    } catch (error) {
      console.error("Erro ao buscar o cardápio:", error);
    }
  }

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
    getMenu();
    getCategories();
  }, []);

  return (
    <Fragment>
      <div className="w-full h-full flex relative p-4">
        <div className="flex flex-col gap-4 overflow-hidden flex-1 items-center">
          <button
            className="flex justify-start w-full text-primary font-semibold"
            onClick={() => router.replace("/categories")}
          >
            <ChevronLeftIcon />
            Voltar
          </button>
          <span className="font-semibold text-xl">
            Categorias do cardápio: {menu?.name}
          </span>
          <ResponsiveGrid childWidth={300}>
            <button
              className="bg-white rounded-lg shadow-lg text-center border-2 w-[300px] border-white text-primary font-bold text-xl h-[60px]"
              onClick={() => setIsOpenCreateCategory(true)}
            >
              Adicionar Categoria
            </button>
            {categories.map((category) => (
              <div className="w-[300px] bg-white rounded-lg shadow-lg p-4 flex justify-between items-center gap-4 border-2 overflow-hidden">
                <span className="truncate">{category.name}</span>
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
      <CreateCategoryModal
        isOpen={isOpenCreateCategory}
        onClose={() => setIsOpenCreateCategory(false)}
        updateCategories={() => getCategories()}
        menuId={params.menuId}
      />
    </Fragment>
  );
}
