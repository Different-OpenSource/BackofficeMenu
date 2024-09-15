"use client";

import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/utils/routes";

export default function SideMenu() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col mn-h-full min-w-52 gap-1 bg-gray-100">
      {routes.map((route) => (
        <button
          className={`flex items-center gap-2 font-semibold p-2 bg-white w-full ${
            pathname.includes(route.path) ? " text-primary " : ""
          }`}
          onClick={() => {
            router.push(route.path);
          }}
        >
          {route.icon}
          <span>{route.name}</span>
        </button>
      ))}
    </div>
  );
}
