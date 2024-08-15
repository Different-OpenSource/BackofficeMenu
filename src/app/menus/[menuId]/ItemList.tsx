import APICaller from "@/utils/APICaller";
import { useEffect, useState } from "react";
import mockItem from "../../../assets/mockItem.jpeg";
import { Item } from "@prisma/client";
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
      {items.map((item: Item) => {
        return (
          <div
            key={item.id}
            className="rounded shadow-md bg-white p-4 flex gap-4 w-96"
          >
            <div className="w-24 h-24 rounded-sm overflow-hidden">
              <img className="h-full w-full" src={mockItem.src}></img>
            </div>
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-400">{item.shortDescription}</div>
              </div>
              <div className="text-end">R$ {item.price.toString()}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
