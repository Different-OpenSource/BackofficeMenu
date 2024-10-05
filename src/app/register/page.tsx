"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { loaderToast } from "@/utils/loaderToast";
import { useStoreRedirect } from "@/utils/useStoreRedirect";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setValue] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleRegister() {
    if (!email || !password || !name) {
      return;
    }
    const requestData = { email, password, name };
    loaderToast(() => APICaller("/api/register", "POST", requestData), {
      success: "Registrado com sucesso!",
      loading: "Registrando...",
      error: "Erro ao registrar",
      onSuccess: () => router.replace(`/login?email=${email}`),
    });
  }

  useStoreRedirect(true);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-col w-96 shadow-xl p-10 rounded-lg gap-2">
        <TextInput
          setValue={setValue}
          value={name}
          type="text"
          label="Nome"
          placeholder="John"
        />
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
            text="Cancelar"
            onClick={() => router.push("/login")}
            style="outline"
          ></Button>
          <Button
            text="Registrar"
            onClick={handleRegister}
            style="primary"
          ></Button>
        </div>
      </div>
    </div>
  );
}
