import { Item } from "@prisma/client";
import mockItem from "../../../assets/mockItem.jpeg";

export default function ItemCard({ item }: { item: Item }) {
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
}
