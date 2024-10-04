import { NumericFormat } from "react-number-format";
import ThreeDotsIcon from "@/assets/ThreeDotsIcon";
import { Fragment } from "react";
import DropdownContextMenu from "@/components/DropdownContextMenu";
import { Item } from "@prisma/client";

export default function ItemCard({
  item,
  onEdit,
  onDelete,
  onSelectCategories,
}: {
  item: Item;
  onEdit?: () => void;
  onDelete?: () => void;
  onSelectCategories?: () => void;
}) {
  function getOptions() {
    const output = [];

    if (onEdit) {
      output.push({ label: "Editar Item", onClick: onEdit });
    }
    if (onSelectCategories) {
      output.push({
        label: "Selecionar Categorias",
        onClick: onSelectCategories,
      });
    }
    if (onDelete) {
      output.push({ label: "Excluir Item", onClick: onDelete });
    }
    return output;
  }

  return (
    <Fragment>
      <div
        key={item.id}
        className="rounded shadow-md bg-white p-4 flex gap-4 w-96"
      >
        <div className="w-24 h-24 rounded-sm overflow-hidden">
          <img className="h-full w-full" src={item.image}></img>
        </div>
        <div className="flex flex-col flex-1 justify-between">
          <div>
            <div className="font-semibold flex justify-between items-center">
              <span>{item.name}</span>
              <DropdownContextMenu options={getOptions()}>
                <ThreeDotsIcon />
              </DropdownContextMenu>
            </div>
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
    </Fragment>
  );
}
