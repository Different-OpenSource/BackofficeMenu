"use client";

import { useAuthRedirect } from "@/utils/isAuthenticated";
import { Fragment, useEffect, useState } from "react";
import APICaller from "@/utils/APICaller";
import { Menu } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const isAuth = useAuthRedirect();
  const [menus, setMenus] = useState<Menu[]>([]);
  useEffect(() => {
    getMenus();
  }, []);
  const router = useRouter();

  async function getMenus() {
    try {
      const response = await APICaller("/api/menus", "GET", {});
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
          <button
            key={i}
            className="bg-white rounded-lg shadow-lg p-4"
            onClick={() => {
              router.push(`/menus/${menu.id}`);
            }}
          >
            {menu.id}
          </button>
        ))}
      </div>
    </div>
  ) : (
    <Fragment />
  );
}
