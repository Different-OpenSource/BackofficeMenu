"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NumberInput from "@/components/NumberInput";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { Item } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateItemModal({
  categoryId,
  isOpen,
  onClose,
  updateItems,
}: {
  categoryId: string;
  isOpen: boolean;
  onClose: () => void;
  updateItems: () => void;
}) {
  const [internalDescription, setInternalDescription] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");

  function clearFields() {
    setDescription("");
    setShortDescription("");
    setPrice(0);
    setName("");
    setInternalDescription("");
  }

  async function createItem() {
    if (!name || !description || !shortDescription || !price) {
      toast.error("Preencha todos os campos!");
      return;
    }
    try {
      const requestData = {
        categoryId,
        description,
        price,
        shortDescription,
        name,
        internalDescription,
      };
      const response = await APICaller("/api/item", "POST", requestData);
      if (response.success) {
        updateItems();
        onClose();
        clearFields();
        toast.success("Item criada com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl text-center">
          Criar novo item
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
        <div className="self-end w-1/2">
          <Button onClick={createItem} style="primary" text="Criar Item" />
        </div>
      </div>
    </Modal>
  );
}
