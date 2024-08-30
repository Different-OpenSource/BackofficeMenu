"use client";
import Modal from "@/components/Modal";
import APICaller from "@/utils/APICaller";
import { Category, Item } from "@prisma/client";
import { useEffect, useState } from "react";

export default function SelectMenusModal({
  menuId,
  item,
  isOpen,
  onClose,
}: {
  menuId: string;
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  
  async function getCategories() {
    try {
      const response = await APICaller(
        `/api/categories?menuId=${menuId}`,
        "GET"
      );
      setAllCategories(response.categories);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  }

  async function getSelectedCategories() {
    try {
      const response = await APICaller(
        `/api/categoryItems?itemId=${item.id}`,
        "GET"
      );
      const categories = response.categoriesItems.map(
        (categoryItem: { Category: Category }) => categoryItem.Category
      );
      setSelectedCategories(categories);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  }

  useEffect(() => {
    getCategories().then(() => getSelectedCategories());
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl text-center">
          Selecionar Categorias
        </span>
        <div className="flex flex-col gap-4">
          {selectedCategories.map((category) => (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={category.id}
                name={category.name}
                value={category.id}
                defaultChecked
              />
              <label htmlFor={category.id}>{category.name}</label>
            </div>
          ))}
          {allCategories.map((category) => (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={category.id}
                name={category.name}
                value={category.id}
              />
              <label htmlFor={category.id}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
