"use client";
import DeleteIcon from "@/assets/DeleteIcon";
import styles from "./styles.module.css";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { useAuthRedirect } from "@/utils/isAuthenticated";
import { Category } from "@prisma/client";
import { Fragment, useEffect, useState } from "react";
import PencilIcon from "@/assets/PencilIcon";
import DeleteEditCategories from "./DeleteEditCategoriesModal";
import DeleteEditCategoriesModal from "./DeleteEditCategoriesModal";
import CreateCategoryModal from "./CreateCategoryModal";

interface MenuItemParams {
  menuId: string;
}
export default function MenuItem({ params }: { params: MenuItemParams }) {
  const isAuth = useAuthRedirect();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<boolean>(false);

  async function getCategories() {
    try {
      const response = await APICaller(
        `/api/categories?menuId=${params.menuId}`,
        "GET"
      );
      console.log(response);
      setCategories(response.categories);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return isAuth ? (
    <div className="w-full h-full flex justify-center p-4">
      <div className="flex flex-col gap-4 overflow-x-hidden">
        <span className="font-semibold text-center">
          Cardápio: {params.menuId}
          <Button
            onClick={() => {
              setEditCategory(true);
            }}
            style="outline"
            text="Editar/  Excluir categorias"
          ></Button>
        </span>
        <div className="flex gap-2 overflow-x-auto scrollbar-thumb-rounded-full  scrollbar-thumb-slate-700 scrollbar-track-transparent scrollbar-thin py-2 ">
          {categories.map((category, i) => (
            <button
              key={i}
              className={`bg-transparent rounded-full border-primary py-1 px-2 border max-h-[34px] text-primary`}
            >
              <span className="font-semibold pointer-events-none text-nowrap">
                {category.name}
              </span>
              <div className="flex flex-col gap-4"></div>
            </button>
          ))}
          <button
            className="bg-primary rounded-full py-1 px-2 border text-white border-primary max-h-[34px]"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <span className="font-semibold pointer-events-none text-nowrap">
              Adicionar Categoria
            </span>
            <div className="flex flex-col gap-4"></div>
          </button>
        </div>
      </div>
      <CreateCategoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        updateCategories={() => getCategories()}
        menuId={params.menuId}
      />
      <DeleteEditCategoriesModal
        isOpen={editCategory}
        onClose={() => setEditCategory(false)}
        categories={categories}
        updateCategories={() => getCategories()}
      />
    </div>
  ) : (
    <Fragment />
  );
}
