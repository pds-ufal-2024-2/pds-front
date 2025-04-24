'use client';

import {
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Pie,
  Legend,
  Cell,
} from 'recharts';

const data = [
  { orgao: 'BRK', casos: 12 },
  { orgao: 'SEMINFRA', casos: 23 },
  { orgao: 'EQUATORIAL', casos: 20 },
  { orgao: 'DMTT', casos: 22 },
];

const destaque = data.reduce((prev, current) => (prev.casos > current.casos ? prev : current)).orgao;

const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

export default function GraficoDemandasComAtraso() {
  return (
    <div className="w-3/4 h-[350px] p-4">
      <h2 className="text-center font-bold text-2xl">Órgãos com atrasos</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart data={data} width={400} height={400}>
          <Pie
            data={data}
            dataKey="casos"
            nameKey="orgao"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            // label
          >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={10} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
