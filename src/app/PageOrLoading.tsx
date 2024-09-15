"use client";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import { Fragment, useContext, useEffect } from "react";
import { StoreContext } from "./contexts/StoreContext";
import { usePathname } from "next/navigation";

export default function PageOrLoading({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const storeContext = useContext(StoreContext);
  const hideHeaderPaths = ["/login", "/register", "/"];

  useEffect(() => {
    storeContext.getStoreData();
  }, [pathname]);

  if (hideHeaderPaths.some((path) => path === pathname)) {
    return children;
  }

  if (storeContext.loading) {
    return <div className="flex h-full w-full">Loading...</div>;
  }
  return (
    <Fragment>
      <Header />
      <div className="flex h-full flex-1">
        <SideMenu />
        {children}
      </div>
    </Fragment>
  );
}
