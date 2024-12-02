"use client";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NumberInput from "@/components/NumberInput";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { loaderToast } from "@/utils/loaderToast";
import { uploadFile } from "@/utils/uploadFile";
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [internalDescription, setInternalDescription] = useState(
    item.internalDescription ?? ""
  );
  const [description, setDescription] = useState(item.description);
  const [shortDescription, setShortDescription] = useState(
    item.shortDescription
  );
  const [price, setPrice] = useState(Number(item.price));
  const [name, setName] = useState(item.name);
  const [image, setImage] = useState<File | null>(null);

  function handleImageChange(event: any) {
    const file = event.target.files[0] as File;
    if (!file) {
      return;
    }
    setImage(file);
  }

  async function editItem() {
    if (!name || !description || !shortDescription || !price) {
      toast.error("Preencha todos os campos!");
      return;
    }

    setIsButtonDisabled(true);

    loaderToast(() => patchItem(), {
      loading: "Editando item...",
      success: "Item editado com sucesso!",
      error: "Erro ao editar item!",
      onSuccess: () => {
        setIsButtonDisabled(false);
        updateItems();
        onClose();
      },
    });
  }

  async function patchItem() {
    const url = image ? await uploadFile(image) : item.image;

    const requestData = {
      id: item.id,
      description,
      price,
      shortDescription,
      name,
      internalDescription,
      image: url,
    };

    await APICaller("/api/item", "PATCH", requestData);
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
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Imagem</span>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
          <div
            className={`flex gap-2 ${isButtonDisabled ? " pointer-events-none opacity-50" : ""}`}
          >
            <Button
              onClick={editItem}
              style="primary"
              text="Salvar alterações"
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
