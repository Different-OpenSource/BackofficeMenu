"use client";

import { useContext, useEffect, useState } from "react";
import APICaller from "@/utils/APICaller";
import { Menu } from "@prisma/client";
import { StoreContext } from "../contexts/StoreContext";
import AddMenuModal from "../menus/AddMenuModal";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { useRouter } from "next/navigation";

export default function Categories() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isOpenAddMenu, setIsOpenAddMenu] = useState(false);
  const router = useRouter();
  useEffect(() => {
    getMenus();
  }, []);
  const storeContext = useContext(StoreContext);

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
          {menus.map((menu) => (
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
          ))}
        </ResponsiveGrid>
      </div>
      <AddMenuModal
        storeId={storeContext.store?.id ?? ""}
        isOpen={isOpenAddMenu}
        onClose={() => setIsOpenAddMenu(false)}
        updateMenus={getMenus}
      />
    </div>
  );
}
