import APICaller from "@/utils/APICaller";
import { useEffect, useState } from "react";
import { Item } from "@prisma/client";
import ItemCard from "./ItemCard";
import CreateItemModal from "./itemModals/CreateItemModal";
import Button from "@/components/Button";
import EditItemModal from "./itemModals/EditItemModal";
import ConfirmDecisionModal from "@/components/ConfirmDecisionModal";
import toast from "react-hot-toast";

export default function ItemList({ categoryId }: { categoryId: string }) {
  const [items, setItems] = useState([]);
  const [isOpenCreateItem, setIsOpenCreateItem] = useState(false);
  const [selectedItemEdit, setSelectedItemEdit] = useState<Item | null>(null);
  const [selectedItemDelete, setSelectedItemDelete] = useState<Item | null>(
    null
  );
  async function getItems() {
    try {
      const response = await APICaller(
        `/api/items?categoryId=${categoryId}`,
        "GET"
      );
      setItems(response.allItems);
    } catch (error) {
      console.error("Erro ao buscar os itens:", error);
    }
  }

  useEffect(() => {
    getItems();
  }, [categoryId]);

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
    <div className="self-center flex flex-col gap-4 mb-4">
      {items &&
        items.map((item: Item) => (
          <ItemCard
            item={item}
            onEdit={() => setSelectedItemEdit(item)}
            onDelete={() => setSelectedItemDelete(item)}
          />
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
    </div>
  );
}
