"use client";

import { StoreContext } from "@/app/contexts/StoreContext";
import { Fragment, useContext } from "react";

export default function Header() {
  const storeContext = useContext(StoreContext);
  return storeContext.store ? (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Header</h1>
      </div>
    </header>
  ) : (
    <Fragment />
  );
}
