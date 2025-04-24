import { XCircleIcon } from "@heroicons/react/24/solid";

export default function ModalNovoOrgao({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-purple-700 hover:text-purple-900">
          <XCircleIcon className="w-6 h-6" />
        </button>

        <h2 className="text-lg font-semibold text-purple-700 mb-4">Cadastrar novo órgão</h2>
        
        <form className="flex flex-col gap-3">
          <input type="text" placeholder="Nome completo do órgão" className="border p-2 rounded" />
          <input type="text" placeholder="SIGLA" className="border p-2 rounded" />
          <input type="text" placeholder="Localização" className="border p-2 rounded" />
          <input type="email" placeholder="E-mail" className="border p-2 rounded" />
          <input type="tel" placeholder="Telefone" className="border p-2 rounded" />
          <h3>Tempo do contrato</h3>
          <h3 className="text-gray-500 text-sm">Início</h3>
          <input type="date" placeholder="Início do contrato" className="border p-2 rounded" />
          <h3 className="text-gray-500 text-sm">Término</h3>
          <input type="date" placeholder="Término do contrato" className="border p-2 rounded" />
          <button type="submit" className="bg-purple-700 hover:bg-purple-600 text-white rounded p-2 mt-2">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
