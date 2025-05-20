'use client';

import {
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Pie,
  Legend,
  Cell,
} from 'recharts';
import { useEffect, useState } from 'react';
import api from '@/services/api';

const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#f59e0b', '#ef4444'];

export default function GraficoDemandasComAtraso() {
  const [data, setData] = useState([]);
  const [destaque, setDestaque] = useState('');
  const [orgaoSelecionado, setOrgaoSelecionado] = useState('');
  const [detalhes, setDetalhes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/incidents');
        const incidentes = res.data;

        // Filtrar atrasados
        const atrasados = incidentes.filter(
          (i) => i.status !== 'RESOLVIDO'
        );

        // Agrupar
        const agrupado = atrasados.reduce((acc, item) => {
          const orgao = item.entity || 'OUTROS';
          acc[orgao] = (acc[orgao] || []);
          acc[orgao].push(item);
          return acc;
        }, {});

        const formatado = Object.entries(agrupado).map(([orgao, lista]) => ({
          orgao,
          casos: lista.length,
          incidentes: lista,
        }));

        setData(formatado);

        if (formatado.length > 0) {
          const mais = formatado.reduce((a, b) => (a.casos > b.casos ? a : b));
          setDestaque(mais.orgao);
        }
      } catch (err) {
        console.error('Erro ao buscar dados dos órgãos com atraso:', err);
      }
    }

    fetchData();
  }, []);

  const handleClick = (data, index) => {
    setOrgaoSelecionado(data.orgao);
    setDetalhes(data.incidentes);
  };

  return (
    <div className="w-full h-auto p-4">
      <h2 className="text-center font-bold text-2xl mb-2">Órgãos com atrasos</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="casos"
            nameKey="orgao"
            cx="50%"
            cy="50%"
            outerRadius={80}
            onClick={handleClick}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={10} />
        </PieChart>
      </ResponsiveContainer>

      {orgaoSelecionado && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-purple-700">
            Detalhes: {orgaoSelecionado}
          </h3>
          <ul className="text-sm space-y-2 max-h-[200px] overflow-y-auto">
            {detalhes.map((i) => (
              <li key={i.id} className="border-b pb-1">
                <span className="font-semibold">{i.incident}</span> — {i.status} ({i.bairro})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
