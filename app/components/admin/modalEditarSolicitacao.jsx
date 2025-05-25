"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import api from "@/services/api";

export default function ModalEditarSolicitacao({
  selecionado,
  setSelecionado,
  onClose,
  atualizarTabela,
}) {
  if (!selecionado) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await api.put(`/incidents/${selecionado.id}`, {
        incident: selecionado.incident,
        status: selecionado.status,
        entity: selecionado.entity,
        description: selecionado.description,
        });

        // Atualiza diretamente no frontend, sem esperar o backend
        // atualizarLocal(selecionado);
        // Atualiza a tabela
        atualizarTabela();

        onClose();
        setSelecionado(null);
    } catch (error) {
        console.error("Erro ao editar:", error);
    }
};


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
              value={selecionado.incident}
              onChange={(e) => setSelecionado({ ...selecionado, incident: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Descrição</label>
            <input
              type="text"
              value={selecionado.description}
              onChange={(e) => setSelecionado({ ...selecionado, description: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Órgão</label>
            <input
              type="text"
              value={selecionado.entity}
              onChange={(e) => setSelecionado({ ...selecionado, entity: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
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

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
