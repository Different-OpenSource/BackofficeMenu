"use client";
import APICaller from "@/utils/APICaller";
import { Store } from "@prisma/client";
import React, { createContext, ReactNode, useState } from "react";

export const StoreContext = createContext<{
  store: Store | null;
  getStoreData: () => void;
  loading: boolean;
}>({ store: null, getStoreData: () => {}, loading: true });

export default function StoreContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  async function getStoreData() {
    try {
      const response = await APICaller("/api/store", "GET", {});
      setStore(response.store);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  return (
    <StoreContext.Provider value={{ store, getStoreData, loading }}>
      {children}
    </StoreContext.Provider>
  );
}
