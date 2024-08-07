"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  async function handleRegister() {
    if (!email || !password || !name) {
      return;
    }
    try {
      const requestData = { email, password, name };
      const response = await APICaller("/api/register", "POST", requestData);
      if (response.success) {
        toast.success("Registrado com sucesso!");
        router.replace(`/login?email=${email}`);
      }
      response.error && toast.error(response.error);
    } catch (error) {
      toast.error("Erro ao registrar!");
      console.error("Error ao registrar:", error);
    }
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col w-96 shadow-xl p-10 rounded-lg gap-2">
        <TextInput
          setName={setName}
          value={name}
          type="text"
          label="Nome"
          placeholder="John"
        />
        <TextInput
          setName={setEmail}
          value={email}
          type="email"
          label="Email"
          placeholder="john.doe@company.com"
        />
        <TextInput
          setName={setPassword}
          value={password}
          type="password"
          label="Senha"
          placeholder="•••••••••"
        />
        <TextInput
          setName={setConfirmPassword}
          value={confirmPassword}
          type="password"
          label="Confirmar Senha"
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
