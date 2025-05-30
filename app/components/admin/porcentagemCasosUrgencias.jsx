'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import api from '@/services/api';

const COLORS = ['#10b981', '#3b82f6', '#ef4444'];

export default function ResumoBairro() {
  const [info, setInfo] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('incidents');
      const incidentes = res.data;
      const total = incidentes.length;

      const altas = incidentes.filter(i => i.priority?.toLowerCase() === 'high').length;
      const medias = incidentes.filter(i => i.priority?.toLowerCase() === 'normal').length;
      const baixas = incidentes.filter(i => i.priority?.toLowerCase() === 'low').length;

      if (total > 0) {
        setInfo({
          total,
          altas: altas / total,
          medias: medias / total,
          baixas: baixas / total,
        });
      } else {
        setInfo(null);
      }
    } catch (err) {
      console.error('Erro ao buscar incidents:', err);
      setInfo(null);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 15000);
    console.log('Intervalo de atualização de 15 segundos configurado');

    return () => clearInterval(interval);
  }, []);

  if (!info) return <div className="text-sm text-gray-500">Sem dados de urgências no momento</div>;

  const pieData = [
    { name: 'Baixa', value: info.baixas },
    { name: 'Média', value: info.medias },
    { name: 'Alta', value: info.altas },
  ];

  return (
    <div className="p-4 w-[240px] flex flex-col items-center">
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
      <div className="mt-3 space-y-1 text-xs w-full">
        <div className="bg-green-600 text-white p-1 rounded text-center">
          {Math.round(info.baixas * 100)}% Baixa
        </div>
        <div className="bg-blue-600 text-white p-1 rounded text-center">
          {Math.round(info.medias * 100)}% Média
        </div>
        <div className="bg-red-600 text-white p-1 rounded text-center">
          {Math.round(info.altas * 100)}% Alta
        </div>
      </div>
    </div>
  );
}
