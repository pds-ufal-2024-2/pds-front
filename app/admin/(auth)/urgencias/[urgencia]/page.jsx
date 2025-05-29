'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/services/api';
import {
  ArrowLeftIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';

export default function HistoricoPage() {
  const router = useRouter();
  const params = useParams();
  const { urgencia } = params;
  const [nomeUrgencia, setNomeUrgencia ] = useState('');
  const [incident, setIncident] = useState(null);

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get(`/incidents/${urgencia}`);
        setIncident(response.data);
        setHistory(response.data.history || []);
        setNomeUrgencia(response.data.incident);

        console.log('Histórico carregado:', response.data);
        console.log('id: ', urgencia);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [urgencia]);

  const handleSendHistory = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const response = await api.post('/history', {
        incident_id: incident.id,
        message: newMessage,
      });

      setHistory((prev) => [...prev, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar histórico:', error);
      alert('Erro ao enviar histórico');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="flex items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-semibold">
          Histórico da Ocorrência {nomeUrgencia}
        </h1>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-purple-700" onClick={() => router.push('/admin/urgencias')}>
          <ArrowLeftIcon
            className="h-6 w-6 text-black cursor-pointer hover:text-purple-700"
          />
          <h1 className="text-black hover:text-purple-700 text-xl">Voltar</h1>
        </div>
      </div>

      
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 mb-8">
        <h2 className="text-lg font-medium mb-2">Adicionar Histórico</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Digite uma atualização..."
            className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-xl flex items-center gap-2 disabled:opacity-50"
            onClick={handleSendHistory}
            disabled={sending}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
            {sending ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </div>

      
      {loading ? (
        <p>Carregando...</p>
      ) : history.length === 0 ? (
        <div className="text-center text-gray-500">
          Ainda não existem históricos para essa ocorrência.
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-200"
            >
              <div className="flex items-center gap-2 mb-1">
                <ClockIcon className="h-5 w-5 text-purple-700" />
                <span className="text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-800">{item.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
