import { Item } from "@prisma/client";
import mockItem from "../../../assets/mockItem.jpeg";
import { NumericFormat } from "react-number-format";

export default function ItemCard({
  item,
  onClick,
}: {
  item: Item;
  onClick: () => void;
}) {
  return (
    <div
      key={item.id}
      className="rounded shadow-md bg-white p-4 flex gap-4 w-96 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-24 h-24 rounded-sm overflow-hidden">
        <img className="h-full w-full" src={mockItem.src}></img>
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="font-semibold">{item.name}</div>
          <div className="text-gray-400">{item.shortDescription}</div>
        </div>
        <NumericFormat
          className="pointer-events-none text-end"
          value={item.price.toString()}
          thousandSeparator="."
          decimalSeparator=","
          prefix={"R$ "}
          decimalScale={2}
          fixedDecimalScale={true}
        />
      </div>
    </div>
  );
}
