"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NumberInput from "@/components/NumberInput";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { loaderToast } from "@/utils/loaderToast";
import { pushImage } from "@/utils/R2";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateItemModal({
  isOpen,
  onClose,
  updateItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  updateItems: () => void;
}) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [internalDescription, setInternalDescription] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  function clearFields() {
    setDescription("");
    setShortDescription("");
    setPrice(0);
    setName("");
    setInternalDescription("");
    setImage(null);
  }

  function handleImageChange(event: any) {
    const file = event.target.files[0] as File;
    if (!file) {
      return;
    }
    setImage(file);
  }

  async function createItem() {
    if (!image) {
      toast.error("Selecione uma imagem!");
      return;
    }
    if (!name || !description || !shortDescription || !price) {
      toast.error("Preencha todos os campos!");
      return;
    }
    setIsButtonDisabled(true);

    loaderToast(() => postItem(), {
      loading: "Criando item...",
      success: "Item criado com sucesso!",
      error: "Erro ao criar item!",
      onSuccess: () => {
        updateItems();
        onClose();
        clearFields();
        setIsButtonDisabled(false);
      },
    });
  }

  async function postItem() {
    const pushOptions = await pushImage(image!);
    const requestData = {
      description,
      price,
      shortDescription,
      name,
      internalDescription,
      image: pushOptions.fileName,
    };
    const response = await APICaller("/api/item", "POST", requestData);
    if (response.success) {
      await pushOptions.uploadFile();
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
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Imagem</span>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <div
          className={`self-end w-1/2 ${isButtonDisabled ? " pointer-events-none opacity-50" : ""}`}
        >
          <Button onClick={createItem} style="primary" text="Criar Item" />
        </div>
      </div>
    </Modal>
  );
}
