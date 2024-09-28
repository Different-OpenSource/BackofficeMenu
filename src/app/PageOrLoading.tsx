"use client";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import { Fragment, useContext, useEffect } from "react";
import { StoreContext } from "./contexts/StoreContext";
import { usePathname } from "next/navigation";
import { useAuthRedirect } from "@/utils/isAuthenticated";

export default function PageOrLoading({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const storeContext = useContext(StoreContext);
  const hideHeaderPaths = ["/login", "/register", "/"];
  if (hideHeaderPaths.some((path) => path === pathname)) {
    return children;
  }
  const isAuth = useAuthRedirect();

  useEffect(() => {
    if (hideHeaderPaths.some((path) => path === pathname)) {
      return;
    }
    storeContext.getStoreData();
  }, [pathname]);

  if (hideHeaderPaths.some((path) => path === pathname)) {
    return children;
  }

  if (storeContext.loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex space-x-2 justify-center items-center   ">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return <Fragment />;
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
