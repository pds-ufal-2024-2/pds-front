"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Config global do Axios
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const autenticar = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      // 1. Solicita o CSRF token do backend
      await axios.get("/sanctum/csrf-cookie");

      // 2. Lê o XSRF-TOKEN do cookie
      const cookies = document.cookie.split("; ");
      const xsrfCookie = cookies.find((c) => c.startsWith("XSRF-TOKEN="));
      if (!xsrfCookie) throw new Error("CSRF token não encontrado.");
      const xsrfToken = decodeURIComponent(xsrfCookie.split("=")[1]);

      // 3. Envia o login com o cabeçalho CSRF
      await axios.post(
        "/login",
        {
          email,
          password: senha,
        },
        {
          headers: {
            "X-XSRF-TOKEN": xsrfToken,
          },
        }
      );

      // 4. Redireciona após login bem-sucedido
      router.push("/admin/urgencias");
    } catch (err) {
      if (err.response?.status === 422) {
        setErro("E-mail ou senha inválidos.");
      } else {
        setErro("Erro ao tentar fazer login. Verifique sua conexão ou tente mais tarde.");
      }
      console.error("Erro no login:", err);
    }
  };

  return (
    <div className="flex items-center justify-center">
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

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />

        {erro && <p className="text-red-600 text-sm">{erro}</p>}

        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
