"use client";
import APICaller from "@/utils/APICaller";
import { Category, Item } from "@prisma/client";
import { Fragment, useEffect, useState } from "react";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import ChevronLeftIcon from "@/assets/ChevronLeftIcon";
import { useRouter } from "next/navigation";
import ItemWithImage from "@/interfaces/ItemWIthImage";
import ItemCard from "@/app/items/ItemCard";
import { getImage } from "@/utils/R2";

interface MenuItemParams {
  menuId: string;
}
export default function MenuItem({ params }: { params: MenuItemParams }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<ItemWithImage[]>([]);

  async function getCategories() {
    try {
      const response = await APICaller(
        `/api/categories?menuId=${params.menuId}`,
        "GET"
      );
      setCategories(response.categories);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  }

  async function getItems() {
    if (!selectedCategory) {
      return;
    }
    try {
      const response = await APICaller(
        `/api/items?categoryId=${selectedCategory.id}`,
        "GET",
        {}
      );
      const items: Item[] = response.allItems;
      const map = new Map<string, File | Blob>();
      const imagePromises = items.map(async (item) => {
        const image = await getImage(item.image);
        map.set(item.id, image);
      });

      Promise.all(imagePromises).then(() => {
        setItems(
          items.map((item) => ({ ...item, imageFile: map.get(item.id)! }))
        );
      });
    } catch (error) {
      console.error("Erro ao buscar os menus:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getItems();
  }, [selectedCategory]);

  return (
    <Fragment>
      <div className="w-full h-full flex relative p-4">
        <div className="flex flex-col gap-4 overflow-hidden flex-1 items-center">
          <button
            className="flex justify-start w-full text-primary font-semibold"
            onClick={() => router.replace("/home")}
          >
            <ChevronLeftIcon />
            Voltar
          </button>
          <span className="font-semibold text-xl">Selecione a cartegoria</span>
          <ResponsiveGrid childWidth={350}>
            {categories.map((category) => (
              <div className="w-[350px] bg-white rounded-lg shadow-lg p-4 flex justify-between items-center gap-4 border-2 overflow-hidden">
                <span className="truncate">{category.name}</span>
                <button
                  className="gap-2 flex font-semibold text-primary whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  Selecionar Categoria
                </button>
              </div>
            ))}
          </ResponsiveGrid>
          {selectedCategory && (
            <Fragment>
              <span className="font-semibold text-xl">
                Itens da Categoria: {selectedCategory.name}
              </span>
              <ResponsiveGrid childWidth={384}>
                {items.map((item, i) => (
                  <ItemCard key={i} item={item} />
                ))}
              </ResponsiveGrid>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}
