"use client";

import APICaller from "@/utils/APICaller";
import { useAuthRedirect } from "@/utils/isAuthenticated";
import { Fragment, useContext, useEffect, useState } from "react";
import { StoreContext } from "./contexts/StoreContext";

interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function Home() {
  const storeContext = useContext(StoreContext);
  const isAuth = useAuthRedirect();

  useEffect(() => {
    storeContext.getStoreData();
  }, []);

  return isAuth ? (
    <div>
      <div>Home here</div>
    </div>
  ) : (
    <Fragment />
  );
}
