import APICaller from "@/utils/APICaller";
import { useEffect, useState } from "react";

export default function ItemList({ categoryId }: { categoryId: string }) {
  const [items, setItems] = useState([]);

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
    <div className="self-center">
      {items.map((item: any) => {
        return (
          <div key={item.id} className="flex flex-col gap-2">
            <span className="font-semibold">{item.name}</span>
            <span>{item.description}</span>
            <span>{item.shortDescription}</span>
            <span>{item.price}</span>
          </div>
        );
      })}
    </div>
  );
}
