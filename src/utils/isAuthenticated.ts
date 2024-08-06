import { useRouter } from "next/navigation";
import APICaller from "./APICaller";
import { useEffect, useState } from "react";

async function isAuthenticated() {
  try {
    const response = await APICaller("/api/authenticated", "GET");
    return response.authenticated;
  } catch (error) {
    console.error("Error:", error);
  }
}

export function useAuthRedirect() {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  const checkAuth = async () => {
    const auth = await isAuthenticated();
    if (!auth) {
      router.push("/login");
    }
    setIsAuth(true);
  };
  useEffect(() => {
    checkAuth();
  });

  return isAuth;
}
