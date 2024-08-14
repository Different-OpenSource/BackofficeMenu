"use client";
import { Category } from "@prisma/client";
import { Fragment, useState } from "react";
import CreateCategoryModal from "./CreateCategoryModal";

export default function CategoriesList({
  categories,
  getCategories,
  menuId,
}: {
  categories: Category[];
  getCategories: () => void;
  menuId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <div className="flex gap-2 overflow-x-auto scrollbar-thumb-rounded-full  scrollbar-thumb-slate-700 scrollbar-track-transparent scrollbar-thin py-2 ">
        {categories.map((category, i) => (
          <button
            key={i}
            className={`bg-transparent rounded-full border-primary py-1 px-2 border max-h-[34px] text-primary`}
          >
            <span className="font-semibold pointer-events-none text-nowrap">
              {category.name}
            </span>
            <div className="flex flex-col gap-4"></div>
          </button>
        ))}
        <button
          className="bg-primary rounded-full py-1 px-2 border text-white border-primary max-h-[34px]"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <span className="font-semibold pointer-events-none text-nowrap">
            Adicionar Categoria
          </span>
          <div className="flex flex-col gap-4"></div>
        </button>
      </div>
      <CreateCategoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        updateCategories={() => getCategories()}
        menuId={menuId}
      />
    </Fragment>
  );
}
