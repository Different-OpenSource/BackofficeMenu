"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { useRouter, useSearchParams } from "next/navigation";
import { InputHTMLAttributes, useState } from "react";
import toast from "react-hot-toast";
import Compressor from "compressorjs";

export default function Login() {
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get("email") || "");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Preencha todos os campos");
      return;
    }
    try {
      const requestData = { email, password };
      const response = await APICaller("/api/login", "POST", requestData);
      if (response.success) {
        localStorage.setItem("token", response.token);
        router.push("/menus");
      } else {
        toast.error("Usuário ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  async function compressImage(event: any) {
    const file = event.target.files[0] as File;
    if (!file) {
      return;
    }
    console.log(file.size);
    const result = await reduceSize(file);
    console.log(result.size);
    setImageUrl(URL.createObjectURL(result));
  }

  function reduceSize(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        convertSize: 100_000,
        quality: 0.6,
        maxWidth: 1000,
        maxHeight: 1000,
        convertTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg"],
        success(result) {
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }

  return (
    <div className="flex w-full h-screen justify-center items-center flex-1">
      <div className="flex flex-col w-96 shadow-xl p-10 rounded-lg gap-2">
        <input
          type="file"
          onChange={compressImage}
          accept="image/png, image/jpeg, image/jpg"
        />
        {imageUrl && <img src={imageUrl} alt="Uploaded file" />}
        <TextInput
          setValue={setEmail}
          value={email}
          type="email"
          label="Email"
          placeholder="john.doe@company.com"
        />
        <TextInput
          setValue={setPassword}
          value={password}
          type="password"
          label="Senha"
          placeholder="•••••••••"
        />
        <div className="flex gap-2 mt-4">
          <Button
            text="Registrar-se"
            onClick={() => router.push("/register")}
            style="outline"
          ></Button>
          <Button text="Entrar" onClick={handleLogin} style="primary"></Button>
        </div>
      </div>
    </div>
  );
}
