import { NumericFormat } from "react-number-format";
import ThreeDotsIcon from "@/assets/ThreeDotsIcon";
import { Fragment } from "react";
import DropdownContextMenu from "@/components/DropdownContextMenu";
import ItemWithImage from "@/interfaces/ItemWIthImage";

export default function ItemCard({
  item,
  onEdit,
  onDelete,
  onSelectMenus,
}: {
  item: ItemWithImage;
  onEdit: () => void;
  onDelete: () => void;
  onSelectMenus: () => void;
}) {
  return (
    <Fragment>
      <div
        key={item.id}
        className="rounded shadow-md bg-white p-4 flex gap-4 w-96"
      >
        <div className="w-24 h-24 rounded-sm overflow-hidden">
          <img
            className="h-full w-full"
            src={URL.createObjectURL(item.imageFile)}
          ></img>
        </div>
        <div className="flex flex-col flex-1 justify-between">
          <div>
            <div className="font-semibold flex justify-between items-center">
              <span>{item.name}</span>
              <DropdownContextMenu
                options={[
                  { label: "Editar Item", onClick: () => onEdit() },
                  { label: "Selecionar Menus", onClick: () => onSelectMenus() },
                  { label: "Excluir Item", onClick: () => onDelete() },
                ]}
              >
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
