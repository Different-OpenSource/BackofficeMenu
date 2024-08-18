"use client";

import { useAuthRedirect } from "@/utils/isAuthenticated";
import { Fragment, useContext, useEffect, useState } from "react";
import APICaller from "@/utils/APICaller";
import { Menu } from "@prisma/client";
import MenuConfigButtons from "./MenuConfigButtons";
import { StoreContext } from "../contexts/StoreContext";

export default function Home() {
  const isAuth = useAuthRedirect();
  const [menus, setMenus] = useState<Menu[]>([]);
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

  return isAuth ? (
    <div className="w-full h-full flex justify-center p-4">
      <div className="flex flex-col gap-4">
        <span className="font-semibold">Cardápios:</span>
        {menus.map((menu) => (
          <div
            key={menu.id}
            className={
              "bg-white rounded-lg shadow-lg p-4 flex justify-between items-center gap-10 border-2 " +
              (isMenuActive(menu) ? " border-primary" : " border-white")
            }
          >
            <span>{menu.name}</span>
            <MenuConfigButtons
              menu={menu}
              updateMenus={getMenus}
              updateStore={() => storeContext.getStoreData()}
              isActive={isMenuActive(menu)}
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Fragment />
  );
}
