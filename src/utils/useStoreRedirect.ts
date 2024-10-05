import { useRouter } from "next/navigation";
import { useEffect } from "react";
import APICaller from "./APICaller";

export function useStoreRedirect(shouldExist: boolean) {
  const router = useRouter();
  async function storeExists() {
    try {
      const response = await APICaller("/api/hasStore", "GET");
      if (!response.success) {
        return;
      }
      const exists = response.exists;

      if (shouldExist && !exists) {
        router.push("/createStore");
      }

      if (!shouldExist && exists) {
        router.push("/home");
      }
    } catch (error) {
      console.error("Erro ao criar restaurante:", error);
    }
  }
  useEffect(() => {
    storeExists();
  }, []);
}
