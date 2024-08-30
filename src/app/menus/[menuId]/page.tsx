"use client";
import APICaller from "@/utils/APICaller";
import { useAuthRedirect } from "@/utils/isAuthenticated";
import { Category } from "@prisma/client";
import { Fragment, useEffect, useState } from "react";
import CategoriesList from "./CategoriesList";
import ItemList from "./ItemList";
import CategoriesLines from "./CategoriesLines";
import Button from "@/components/Button";

interface MenuItemParams {
  menuId: string;
}
export default function MenuItem({ params }: { params: MenuItemParams }) {
  const isAuth = useAuthRedirect();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpenCategoriesLines, setisOpenCategoriesLines] =
    useState<boolean>(false);

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
    <div className="w-full h-full flex relative">
      <div className=" absolute left-0 top-0 h-full border-blue-800 border-l p-4 flex flex-col gap-4">
        <div className="w-64">
          <Button
            style="outline"
            text="Editar/Excluir Categorias"
            onClick={() => setisOpenCategoriesLines(!isOpenCategoriesLines)}
          ></Button>
        </div>
        <CategoriesLines
          isOpen={isOpenCategoriesLines}
          categories={categories}
          updateCategories={getCategories}
        />
      </div>
      <div className="flex flex-col gap-4 overflow-hidden flex-1 items-center">
        <span className="font-semibold text-center">
          Cardápio: {params.menuId}
        </span>
        <CategoriesList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(category) => setSelectedCategory(category)}
          getCategories={() => getCategories()}
          menuId={params.menuId}
        />
        {selectedCategory && (
          <ItemList menuId={params.menuId} categoryId={selectedCategory?.id} />
        )}
      </div>
    </div>
  ) : (
    <Fragment />
  );
}
