"use client";
import Button from "@/components/Button";
import ConfirmDecisionModal from "@/components/ConfirmDecisionModal";
import Modal from "@/components/Modal";
import NumberInput from "@/components/NumberInput";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { Item } from "@prisma/client";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";

export default function EditItemModal({
  item,
  isOpen,
  onClose,
  updateItems,
}: {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  updateItems: () => void;
}) {
  const [internalDescription, setInternalDescription] = useState(
    item.internalDescription ?? ""
  );
  const [description, setDescription] = useState(item.description);
  const [shortDescription, setShortDescription] = useState(
    item.shortDescription
  );
  const [price, setPrice] = useState(Number(item.price));
  const [name, setName] = useState(item.name);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);

  async function deleteItem() {
    try {
      const response = await APICaller(`/api/item?itemId=${item.id}`, "DELETE");
      if (response.success) {
        updateItems();
        onClose();
        toast.success("Item excluído com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar item:", error);
    }
  }

  async function editItem() {
    if (!name || !description || !shortDescription || !price) {
      toast.error("Preencha todos os campos!");
      return;
    }
    try {
      const requestData = {
        id: item.id,
        description,
        price,
        shortDescription,
        name,
        internalDescription,
      };
      const response = await APICaller("/api/item", "PATCH", requestData);
      if (response.success) {
        updateItems();
        onClose();
        toast.success("Item editado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  }
  return (
    <Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-4">
          <span className="font-semibold text-xl text-center">
            Editar/Excluir item
          </span>
          <TextInput
            label="Nome"
            placeholder="Costelinha com barbecue"
            setValue={setName}
            value={name}
            type="text"
          />
          <TextInput
            label="Descrição"
            placeholder="Deliciosa costelinha suína com molho barbecue"
            setValue={setDescription}
            value={description}
            type="text"
          />
          <TextInput
            label="Descrição curta"
            placeholder="Costelinha suína com barbecue"
            setValue={setShortDescription}
            value={shortDescription}
            type="text"
          />
          <TextInput
            label="Descrição Interna"
            placeholder="Servir apenas nas quartas-feiras"
            setValue={setInternalDescription}
            value={internalDescription}
            type="text"
          />
          <NumberInput
            label="Preço"
            placeholder="25.00"
            value={price}
            setValue={setPrice}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => setIsOpenConfirmDelete(true)}
              style="danger"
              text="Excluir Item"
            />
            <Button
              onClick={editItem}
              style="primary"
              text="Salvar alterações"
            />
          </div>
        </div>
      </Modal>
      <ConfirmDecisionModal
        isOpen={isOpenConfirmDelete}
        onClose={() => setIsOpenConfirmDelete(false)}
        title="Excluir item"
        message="Tem certeza que deseja excluir o item"
        onConfirm={deleteItem}
        onDecline={() => {}}
      />
    </Fragment>
  );
}
