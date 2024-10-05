"use client";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { loaderToast } from "@/utils/loaderToast";
import { useStoreRedirect } from "@/utils/useStoreRedirect";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CreateStore() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useStoreRedirect(false);

  function handleImageChange(event: any) {
    const file = event.target.files[0] as File;
    if (!file) {
      return;
    }
    setImage(file);
  }

  async function createStore() {
    if (!name || !description || !image) {
      toast.error("Insira todos os dados");
      return;
    }

    loaderToast(
      () =>
        APICaller("/api/store", "POST", {
          name,
          description,
          image:
            "https://dbdzm869oupei.cloudfront.net/img/vinylrugs/preview/26956.png",
        }),
      {
        success: "Restaurante criado com sucesso!",
        loading: "Criando restaurante...",
        error: "Erro ao criar restaurante",
        onSuccess: () => router.push("/home"),
      }
    );
  }

  return (
    <div className="flex w-full h-screen justify-center items-center flex-1">
      <div className="flex flex-col w-96 shadow-xl p-10 rounded-lg gap-2">
        <TextInput
          setValue={setName}
          value={name}
          type="text"
          label="Nome do restaurante"
          placeholder="Ritmo Saboroso"
        />
        <TextInput
          setValue={setDescription}
          value={description}
          type="text"
          label="Descrição"
          placeholder="Surpreenda-se com a melodia e o sabor"
        />
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Imagem</span>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
        <div className="mt-4">
          <Button
            text="Criar restaurante"
            onClick={() => createStore()}
            style="primary"
          ></Button>
        </div>
      </div>
    </div>
  );
}
