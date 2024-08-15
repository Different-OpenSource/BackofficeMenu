import APICaller from "@/utils/APICaller";
import { useEffect, useState } from "react";
import { Item } from "@prisma/client";
import ItemCard from "./ItemCard";
import CreateItemModal from "./itemModals/CreateItemModal";
import Button from "@/components/Button";
export default function ItemList({ categoryId }: { categoryId: string }) {
  const [items, setItems] = useState([]);
  const [isOpenCreateItem, setIsOpenCreateItem] = useState(false);
  async function getItems() {
    try {
      const response = await APICaller(
        `/api/items?categoryId=${categoryId}`,
        "GET"
      );
      setItems(response.items);
    } catch (error) {
      console.error("Erro ao buscar os itens:", error);
    }
  }

  useEffect(() => {
    getItems();
  }, [categoryId]);

  return (
    <div className="self-center flex flex-col gap-4">
      {items.map((item: Item) => (
        <ItemCard item={item} />
      ))}
      <Button
        style="outline"
        onClick={() => setIsOpenCreateItem(true)}
        text="Adicionar Item"
      ></Button>
      <CreateItemModal
        categoryId={categoryId}
        isOpen={isOpenCreateItem}
        onClose={() => setIsOpenCreateItem(false)}
        updateItems={() => getItems()}
      />
    </div>
  );
}
