"use client";

import { useEffect, useState } from "react";
import APICaller from "@/utils/APICaller";
import { Menu } from "@prisma/client";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { useRouter } from "next/navigation";
import { Skeletons } from "@/components/Skeleton";

export default function Categories() {
  const [menus, setMenus] = useState<Menu[] | null>(null);
  const router = useRouter();
  useEffect(() => {
    getMenus();
  }, []);

  async function getMenus() {
    try {
      const response = await APICaller("/api/menus", "GET", {});
      setMenus(response.menus);
    } catch (error) {
      console.error("Erro ao buscar os menus:", error);
    }
  }

  return (
    <div className="w-full h-full flex justify-center p-4">
      <div className="flex flex-col gap-4 w-full">
        <span className="font-semibold text-xl text-center">
          Selecione o cardápio
        </span>
        <ResponsiveGrid childWidth={300}>
          {menus ? (
            menus.map((menu) => (
              <div
                key={menu.id}
                className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center gap-4 border-2 w-[300px] overflow-hidden whitespace-nowrap border-white"
              >
                <span className="truncate">{menu.name}</span>
                <button
                  className="font-semibold text-primary"
                  onClick={() => router.push(`/categories/${menu.id}`)}
                >
                  Editar Categorias
                </button>
              </div>
            ))
          ) : (
            <Skeletons className="w-[300px] h-[60px] rounded-lg" />
          )}
        </ResponsiveGrid>
      </div>
    </div>
  );
}
