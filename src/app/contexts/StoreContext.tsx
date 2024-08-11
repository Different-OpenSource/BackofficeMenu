"use client";
import APICaller from "@/utils/APICaller";
import { Store } from "@prisma/client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const StoreContext = createContext<{
  store: Store | null;
  getStoreData: () => void;
}>({ store: null, getStoreData: () => {} });

export default function StoreContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [store, setStore] = useState<Store | null>(null);

  async function getStoreData() {
    try {
      const response = await APICaller("/api/storeData", "GET", {});
      setStore(response.store);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  return (
    <StoreContext.Provider value={{ store, getStoreData }}>
      {children}
    </StoreContext.Provider>
  );
}
