"use client";

import APICaller from "@/utils/APICaller";
import { useAuthRedirect } from "@/utils/isAuthenticated";
import { Category } from "@prisma/client";
import { Fragment, useEffect, useState } from "react";

interface MenuItemParams {
  menuId: string;
}
export default function MenuItem({ params }: { params: MenuItemParams }) {
  const isAuth = useAuthRedirect();
  const [categories, setCategories] = useState<Category[]>([]);

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
      <div className="flex flex-col gap-4">
        <span className="font-semibold">Cardápio: {params.menuId}</span>
        <div className="flex gap-2">
          {categories.map((category, i) => (
            <button
              key={i}
              className="bg-transparent rounded-full border-primary py-1 px-2 border text-primary max-h-[34px]"
            >
              <span className="font-semibold pointer-events-none">
                {category.name}
              </span>
              <div className="flex flex-col gap-4"></div>
            </button>
          ))}
          <button className="bg-primary rounded-full py-1 px-2 border text-white border-primary max-h-[34px]">
            <span className="font-semibold pointer-events-none">
              Adicionar Categoria
            </span>
            <div className="flex flex-col gap-4"></div>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Fragment />
  );
}
