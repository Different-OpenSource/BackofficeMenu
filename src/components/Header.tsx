"use client";

import { StoreContext } from "@/app/contexts/StoreContext";
import { Fragment, useContext } from "react";

export default function Header() {
  const storeContext = useContext(StoreContext);

  if (!storeContext.store) {
    return <Fragment />;
  }

  const store = storeContext.store;

  return (
    <header className="bg-white">
      <div className="w-full p-4 flex gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img className="h-full w-full" src={store.image}></img>
        </div>
        <div className="flex flex-col h-full justify-center">
          <span className="text-3xl font-semibold">{store.name}</span>
          <span className="text-gray-600">{store.description}</span>
        </div>
      </div>
    </header>
  );
}
