"use client";
import Button from "@/components/Button";
import APICaller from "@/utils/APICaller";
import { useAuthRedirect } from "@/utils/isAuthenticated";
import { Category } from "@prisma/client";
import { Fragment, useEffect, useState } from "react";
import DeleteEditCategoriesModal from "./categoriesModals/DeleteEditCategoriesModal";
import CategoriesList from "./CategoriesList";
import ItemList from "./ItemList";

interface MenuItemParams {
  menuId: string;
}
export default function MenuItem({ params }: { params: MenuItemParams }) {
  const isAuth = useAuthRedirect();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategory, setEditCategory] = useState<boolean>(false);

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
            text="Editar/ Excluir categorias"
          ></Button>
        </span>
        <CategoriesList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(category) => setSelectedCategory(category)}
          getCategories={() => getCategories()}
          menuId={params.menuId}
        />
        {selectedCategory && <ItemList categoryId={selectedCategory?.id} />}
      </div>
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
