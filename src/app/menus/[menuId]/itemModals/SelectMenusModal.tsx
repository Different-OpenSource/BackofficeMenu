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
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

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

  function handleSelectCategories(category: Category) {
    const isCategorySelected = selectedCategories.some(
      (selectedCategory) => selectedCategory.id === category.id
    );

    if (isCategorySelected) {
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory.id !== category.id
        )
      );
      return;
    }
    setSelectedCategories([...selectedCategories, category]);
  }

  function saveChanges() {
    const categoriesIds = selectedCategories.map(
      (selectedCategory) => selectedCategory.id
    );

    const body = {
      itemId: item.id,
      categoriesIds,
    };

    APICaller("/api/categoryItems", "POST", body).then(() => onClose());
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        saveChanges();
        onClose();
      }}
    >
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl text-center">
          Selecionar Categorias
        </span>
        <div className="flex flex-col gap-4">
          {allCategories.map((category) => (
            <div
              className="flex items-center gap-2"
              onClick={() => handleSelectCategories(category)}
            >
              <input
                className="pointer-events-none w-6 h-6"
                type="checkbox"
                id={category.id}
                name={category.name}
                value={category.id}
                checked={selectedCategories.some(
                  (selectedCategory) => selectedCategory.id === category.id
                )}
              />
              <label className="pointer-events-none" htmlFor={category.id}>
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
