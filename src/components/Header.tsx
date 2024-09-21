"use client";

import { StoreContext } from "@/app/contexts/StoreContext";
import { useContext } from "react";
import mockLogo from "../assets/mockLogo.png";

export default function Header() {
  const storeContext = useContext(StoreContext);

  return (
    storeContext.store && (
      <header className="bg-white">
        <div className="w-full p-4 flex gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img className="h-full w-full" src={mockLogo.src}></img>
          </div>
          <div className="flex flex-col h-full justify-center">
            <span className="text-3xl font-semibold">
              {storeContext.store.name}
            </span>
            <span className="text-gray-600">
              {storeContext.store.description}
            </span>
          </div>
        </div>
      </header>
    )
  );
}
