'use client';

import APICaller from "@/utils/APICaller";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const router = useRouter();

    async function handleLogin() {
        if (!email || !password) {
            return;
        }
        try {
            const requestData = { email, password };
            const response = await APICaller("/api/login", "POST", requestData);
            if (response.success) {
                localStorage.setItem("token", response.token);
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    }

    async function handleRegister() {
        if (!email || !password || !name) {
            return;
        }
        try {
            const requestData = { email, password, name };
            const response = await APICaller("/api/register", "POST", requestData);
            if (response.success) {
                localStorage.setItem("token", response.token);
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Error ao registrar:", error);
        }
    };

    async function helloWorld() {
        try {
            const response = await APICaller("/api/helloworld", "GET");
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="mr-10">Login</button>
            <button onClick={handleRegister} className="mr-10">Register</button>
            <button onClick={helloWorld} className="mr-10">hello world (needs auth)</button>
        </div>
    )

}