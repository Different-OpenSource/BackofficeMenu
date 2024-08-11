"use client";

import { useAuthRedirect } from "@/utils/isAuthenticated";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function Home() {
  const isAuth = useAuthRedirect();
  const router = useRouter();
  useEffect(() => {
    if (isAuth) {
      router.replace("/menus");
    }
  }, [isAuth]);
  return <Fragment />;
}
