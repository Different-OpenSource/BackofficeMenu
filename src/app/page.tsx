"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/menus");
  }, []);
  return <Fragment />;
}
