"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import api from "@/services/api";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";

export default function ModalEditarSolicitacao({
  selecionado,
  setSelecionado,
  onClose,
  atualizarTabela,
}) {
  if (!selecionado) return null;
  const [carregando, setCarregando] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setCarregando(true);
        await api.put(`/incidents/${selecionado.id}`, {
        incident: selecionado.incident,
        status: selecionado.status,
        entity: selecionado.entity,
        description: selecionado.description,
        category: selecionado.category,
        public_visibility: selecionado.public_visibility,
        });

        // Atualiza diretamente no frontend, sem esperar o backend
        // atualizarLocal(selecionado);
        // Atualiza a tabela
        atualizarTabela();

        onClose();
        setSelecionado(null);
    } catch (error) {
        console.error("Erro ao editar:", error);
        
    } finally {
      setCarregando(false);
    }
};

  const tipos = [
    "Transporte",
    "Saneamento",
    "Iluminação",
    "Violência",
    "Saúde",
    "Moradia",
    "Meio Ambiente",
  ];

  const [tipoBusca, setTipoBusca] = React.useState(selecionado.category || "");
  const [mostrarSugestoes, setMostrarSugestoes] = React.useState(false);

  const sugestoes = tipos.filter(
    (tipo) =>
      tipo.toLowerCase().includes(tipoBusca.toLowerCase()) && tipoBusca.trim() !== ""
  );

  React.useEffect(() => {
    setSelecionado({ ...selecionado, category: tipoBusca });
  }, [tipoBusca]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-2/5 bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-700">Editar Ocorrência</h2>
          <button onClick={onClose}>
            <XCircleIcon className="h-6 w-6 text-purple-700 hover:text-purple-900" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Problema</label>
            <input
              type="text"
              value={selecionado.incident || ""}
              onChange={(e) => setSelecionado({ ...selecionado, incident: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium">Tipo</label>
            <input
              type="text"
              value={tipoBusca || ""}
              onChange={(e) => {
                setTipoBusca(e.target.value);
                setMostrarSugestoes(true);
              }}
              onFocus={() => setMostrarSugestoes(true)}
              onBlur={() => setTimeout(() => setMostrarSugestoes(false), 100)}
              className="w-full border rounded px-3 py-2"
              placeholder="Digite para buscar..."
              autoComplete="off"
            />
            {mostrarSugestoes && sugestoes.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-40 overflow-y-auto">
                {sugestoes.map((tipo) => (
                  <li
                    key={tipo}
                    className="px-3 py-2 hover:bg-purple-100 cursor-pointer"
                    onMouseDown={() => {
                      setTipoBusca(tipo);
                      setMostrarSugestoes(false);
                    }}
                  >
                    {tipo}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Descrição</label>
            <input
              type="text"
              value={selecionado.description || ""}
              onChange={(e) => setSelecionado({ ...selecionado, description: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Órgão</label>
            <input
              type="text"
              value={selecionado.entity || ""}
              onChange={(e) => setSelecionado({ ...selecionado, entity: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Visibilidade</label>
            <select
              value={selecionado.public_visibility}
              onChange={(e) =>
                setSelecionado({ ...selecionado, public_visibility: parseInt(e.target.value) })
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value={1}>Público</option>
              <option value={0}>Privado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Urgência</label>
            <select
              value={selecionado.status}
              onChange={(e) => setSelecionado({ ...selecionado, status: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="ALTA">Alta</option>
              <option value="MÉDIA">Média</option>
              <option value="BAIXA">Baixa</option>
              <option value="RESOLVIDO">Resolvido</option>
            </select>
          </div>
          <Button
            type="submit"
            isLoading={carregando}
            className="w-full bg-purple-700 text-white py-2 mt-2 rounded hover:bg-purple-800"
          >
            Salvar Alterações
          </Button>
        </form>
      </div>
    </div>
  );
}
