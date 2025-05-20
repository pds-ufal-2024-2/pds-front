"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from '@/services/api';
import { Button, Spinner } from "@heroui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const autenticar = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    try {
      const res = await api.post("/login", {
        email,
        password: senha,
      });
      console.log("Login bem-sucedido:", res.data);
      localStorage.setItem("token", res.data.access_token);
      router.push("/admin/urgencias");
    } catch (err) {
      if (err.response?.status === 422) {
        setErro("E-mail ou senha inválidos.");
      } else {
        setErro("Erro ao tentar fazer login. Verifique sua conexão ou tente mais tarde.");
      }
      console.error("Erro no login:", err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gradient-to-r from-purple-500 to-blue-500">
      <form
        onSubmit={autenticar}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">Login</h2>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />

        <div className="flex flex-col items-start gap-1 w-full relative">
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="text-purple-500 hover:text-purple-400 absolute right-3 top-2"
          >
            {mostrarSenha ? <EyeSlashIcon className="h-5 w-5 inline-block mr-1"/> : <EyeIcon className="h-5 w-5 inline-block mr-1" />}
          </button>
        </div>

        {erro && <p className="text-red-600 text-sm">{erro}</p>}

        <Button
          type="submit"
          disabled={carregando}
          isLoading={carregando}
          className="w-full bg-purple-700 text-white py-2 mt-2 rounded hover:bg-purple-800"
        >
          ENTRAR
        </Button>
      </form>
    </div>
  );
}
