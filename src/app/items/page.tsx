"use client";

import { Fragment, useEffect, useState } from "react";
import APICaller from "@/utils/APICaller";
import { Item } from "@prisma/client";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import SelectMenusModal from "@/components/itemModals/SelectMenusModal";
import ConfirmDecisionModal from "@/components/ConfirmDecisionModal";
import EditItemModal from "@/components/itemModals/EditItemModal";
import ItemCard from "./ItemCard";
import CreateItemModal from "@/components/itemModals/CreateItemModal";
import { Skeletons } from "@/components/Skeleton";
import { loaderToast } from "@/utils/loaderToast";

export default function Items() {
  const [selectedItemDelete, setSelectedItemDelete] = useState<Item | null>(
    null
  );
  const [selectedItemEdit, setSelectedItemEdit] = useState<Item | null>(null);
  const [selectedItemSelectCategories, setSelectedItemSelectCategories] =
    useState<Item | null>(null);
  const [isOpenCreateItem, setIsOpenCreateItem] = useState(false);

  const [items, setItems] = useState<Item[] | null>();
  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      const response = await APICaller("/api/allItems", "GET", {});
      setItems(response.allItems);
    } catch (error) {
      console.error("Erro ao buscar os menus:", error);
    }
  }

  async function deleteItem(item: Item) {
    loaderToast(() => APICaller(`/api/item?itemId=${item.id}`, "DELETE"), {
      loading: "Excluindo item...",
      success: "Item Excluído com sucesso!",
      error: "Erro ao excluir item!",
      onSuccess: () => {
        getItems();
      },
    });
  }

  return (
    <Fragment>
      <div className="w-full h-full flex justify-center p-4">
        <div className="flex flex-col gap-4 w-full">
          <span className="font-semibold text-xl text-center">Itens:</span>
          <ResponsiveGrid childWidth={384}>
            <button
              className="w-96 h-32 bg-white rounded text-center text-xl font-semibold text-primary"
              onClick={() => setIsOpenCreateItem(true)}
            >
              Adicionar Item
            </button>
            {items ? (
              items.map((item, i) => (
                <ItemCard
                  key={i}
                  item={item}
                  onEdit={() => setSelectedItemEdit(item)}
                  onDelete={() => setSelectedItemDelete(item)}
                  onSelectCategories={() =>
                    setSelectedItemSelectCategories(item)
                  }
                />
              ))
            ) : (
              <Skeletons className="w-96 h-32 rounded" />
            )}
          </ResponsiveGrid>
        </div>
      </div>
      <CreateItemModal
        updateItems={() => getItems()}
        isOpen={isOpenCreateItem}
        onClose={() => setIsOpenCreateItem(false)}
      />
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
      {selectedItemSelectCategories && (
        <SelectMenusModal
          isOpen={selectedItemSelectCategories !== null}
          onClose={() => setSelectedItemSelectCategories(null)}
          item={selectedItemSelectCategories}
        />
      )}
    </Fragment>
  );
}
