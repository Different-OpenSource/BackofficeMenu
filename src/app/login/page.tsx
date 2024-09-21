"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import APICaller from "@/utils/APICaller";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get("email") || "");
  const [password, setPassword] = useState("");

  const router = useRouter();

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
        router.push("/");
      } else {
        toast.error("Usuário ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col w-96 shadow-xl p-10 rounded-lg gap-2">
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
