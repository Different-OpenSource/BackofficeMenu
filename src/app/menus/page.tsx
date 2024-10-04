"use client";

import { useContext, useEffect, useState } from "react";
import APICaller from "@/utils/APICaller";
import { Menu } from "@prisma/client";
import MenuConfigButtons from "./MenuConfigButtons";
import { StoreContext } from "../contexts/StoreContext";
import AddMenuModal from "@/components/menuModals/AddMenuModal";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { Skeletons } from "@/components/Skeleton";

export default function Home() {
  const [menus, setMenus] = useState<Menu[] | null>(null);
  const [isOpenAddMenu, setIsOpenAddMenu] = useState(false);
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

  function isMenuActive(menu: Menu) {
    return storeContext.store?.activeMenuId === menu.id;
  }

  return (
    <div className="w-full h-full flex justify-center p-4">
      <div className="flex flex-col gap-4 w-full">
        <ResponsiveGrid childWidth={400}>
          <button
            className="bg-white rounded-lg shadow-lg text-center border-2 w-[400px] border-white text-primary font-bold text-xl h-[60px]"
            onClick={() => setIsOpenAddMenu(true)}
          >
            Adicionar Cardápio
          </button>
          {menus ? (
            menus.map((menu) => (
              <div
                key={menu.id}
                className={
                  "bg-white rounded-lg shadow-lg p-4 flex justify-between items-center gap-4 border-2 w-[400px] overflow-hidden whitespace-nowrap" +
                  (isMenuActive(menu) ? " border-primary" : " border-white")
                }
              >
                <span className="truncate">{menu.name}</span>
                <MenuConfigButtons
                  menu={menu}
                  updateMenus={getMenus}
                  updateStore={() => storeContext.getStoreData()}
                  isActive={isMenuActive(menu)}
                />
              </div>
            ))
          ) : (
            <Skeletons className="w-[400px] h-[60px] rounded-lg" />
          )}
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
