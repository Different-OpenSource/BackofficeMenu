"use client";

import { useAuthRedirect } from "@/utils/isAuthenticated";
import { Fragment, useContext, useEffect, useState } from "react";
import APICaller from "@/utils/APICaller";
import { Menu } from "@prisma/client";
import { StoreContext } from "../contexts/StoreContext";

export default function Home() {
  const storeContext = useContext(StoreContext);
  const isAuth = useAuthRedirect();
  const [menus, setMenus] = useState<Menu[]>([]);
  useEffect(() => {
    storeContext.getStoreData();
    getMenus();
  }, []);

  async function getMenus() {
    try {
      const response = await APICaller("/api/menu", "GET", {});
      setMenus(response.menus);
    } catch (error) {
      console.error("Erro ao buscar os menus:", error);
    }
  }

  return isAuth ? (
    <div className="w-full h-full flex justify-center p-4">
      <div className="flex flex-col gap-4">
        <span className="font-semibold">Cardápios:</span>
        {menus.map((menu, i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg p-4">
            {menu.id}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Fragment />
  );
}
