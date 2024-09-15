"use client";

import { Fragment, useEffect, useState } from "react";
import APICaller from "@/utils/APICaller";
import { Item } from "@prisma/client";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import SelectMenusModal from "./itemModals/SelectMenusModal";
import ConfirmDecisionModal from "@/components/ConfirmDecisionModal";
import EditItemModal from "./itemModals/EditItemModal";
import toast from "react-hot-toast";
import ItemCard from "./ItemCard";

export default function Items() {
  const [selectedItemEdit, setSelectedItemEdit] = useState<Item | null>(null);
  const [selectedItemDelete, setSelectedItemDelete] = useState<Item | null>(
    null
  );
  const [selectedItemSelectMenus, setSelectedItemSelectMenus] =
    useState<Item | null>(null);

  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      const response = await APICaller("/api/allItems", "GET", {});
      setItems(response.allItems);
      console.log(response.allItems);
    } catch (error) {
      console.error("Erro ao buscar os menus:", error);
    }
  }

  async function deleteItem(item: Item) {
    try {
      const response = await APICaller(`/api/item?itemId=${item.id}`, "DELETE");
      if (response.success) {
        getItems();
        toast.success("Item excluído com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  }

  return (
    <Fragment>
      <div className="w-full h-full flex justify-center p-4">
        <div className="flex flex-col gap-4 w-full">
          <span className="font-semibold text-xl text-center">Itens:</span>
          <ResponsiveGrid childWidth={384}>
            {items.map((item) => (
              <ItemCard
                item={item}
                onEdit={() => setSelectedItemEdit(item)}
                onDelete={() => setSelectedItemDelete(item)}
                onSelectMenus={() => setSelectedItemSelectMenus(item)}
              />
            ))}
          </ResponsiveGrid>
        </div>
      </div>
      {selectedItemEdit && (
        <EditItemModal
          item={selectedItemEdit}
          isOpen={selectedItemEdit !== null}
          onClose={() => setSelectedItemEdit(null)}
          updateItems={() => getItems()}
        />
      )}
      {selectedItemDelete && (
        <ConfirmDecisionModal
          isOpen={selectedItemDelete !== null}
          onClose={() => setSelectedItemDelete(null)}
          title="Excluir item"
          message="Tem certeza que deseja excluir o item"
          onConfirm={() => deleteItem(selectedItemDelete)}
          onDecline={() => {}}
        />
      )}
      {selectedItemSelectMenus && (
        <SelectMenusModal
          isOpen={selectedItemSelectMenus !== null}
          onClose={() => setSelectedItemSelectMenus(null)}
          item={selectedItemSelectMenus}
        />
      )}
    </Fragment>
  );
}
