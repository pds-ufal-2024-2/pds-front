'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import api from '@/services/api';

const COLORS = ['#9333ea', '#1e40af', '#ef4444'];

export default function ResumoBairro({ bairro }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/incidents');
        const incidentes = res.data.filter(i => i.bairro === bairro);
        console.log("incidentes:", incidentes); 

        const total = incidentes.length;
        if (total === 0) return setInfo(null);
        //precisa mudar pra pegar os status corretos
        const solucionados = incidentes.filter(i => i.status === 'BAIXA').length;
        const pendentesUrgentes = incidentes.filter(i => i.status !== 'BAIXA' && i.status === 'BAIXA').length;
        const pendentesComuns = total - solucionados - pendentesUrgentes;

        setInfo({
          total,
          solucionados: solucionados / total,
          pendentesComuns: pendentesComuns / total,
          pendentesUrgentes: pendentesUrgentes / total,
        });
      } catch (err) {
        console.error('Erro ao buscar dados do bairro:', err);
        setInfo(null);
      }
    }

    fetchData();
  }, [bairro]);

  if (!info) return <div className="text-sm text-gray-500">Sem dados para o bairro {bairro}</div>;

  const pieData = [
    { name: 'Solucionados', value: info.solucionados },
    { name: 'Pend. Médias/Baixas', value: info.pendentesComuns },
    { name: 'Pend. Urgentes', value: info.pendentesUrgentes },
  ];

  return (
    <div className="p-4 w-[240px] flex flex-col items-center">
      <h3 className="text-center font-semibold text-sm mb-2">{bairro}</h3>
      <PieChart width={180} height={130}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={50}
          dataKey="value"
        >
          {pieData.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i]} />
          ))}
        </Pie>
      </PieChart>
      <div className="text-center font-bold text-sm">{info.total} CASOS</div>
      <div className="mt-3 space-y-1 text-xs">
        <div className="bg-purple-600 text-white p-1 rounded text-center">
          {Math.round(info.solucionados * 100)}% Solucionados no mês
        </div>
        <div className="bg-white border border-blue-700 text-blue-900 rounded p-1 text-center">
          {Math.round(info.pendentesComuns * 100)}% Pendentes <span className="text-yellow-500">Médias ou baixas</span>
        </div>
        <div className="bg-white border border-red-500 text-red-600 rounded p-1 text-center">
          {Math.round(info.pendentesUrgentes * 100)}% Pendentes <span className="text-red-500">Urgentes</span>
        </div>
      </div>
    </div>
  );
}
