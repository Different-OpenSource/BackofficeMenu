"use client";

import DeleteIcon from "@/assets/DeleteIcon";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/utils/routes";

export default function SideMenu() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col mn-h-full w-64 gap-1 bg-gray-100">
      {routes.map((route) => (
        <button
          className={`flex items-center gap-2 font-semibold p-2 bg-white ${
            pathname === route.path ? " text-primary " : ""
          }`}
          onClick={() => {
            router.push(route.path);
          }}
        >
          <DeleteIcon />
          <span>{route.name}</span>
        </button>
      ))}
    </div>
  );
}
