'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { empresa: 'BRK', pendentes: 12, realizadas: 10 },
  { empresa: 'EQUATORIAL', pendentes: 17, realizadas: 12 },
  { empresa: 'DEF. CIVIL', pendentes: 23, realizadas: 11 },
  { empresa: 'DMTT', pendentes: 20, realizadas: 20 },
  { empresa: 'SEMINFRA', pendentes: 19, realizadas: 25 },
];

const destaque = 'DEF. CIVIL';
const coresPendentes = ['#a78bfa', '#f472b6', '#60a5fa', '#facc15', '#34d399'];
const coresRealizadas = ['#8b5cf6', '#ec4899', '#3b82f6', '#eab308', '#10b981'];

export default function GraficoDemandasRelatorio() {
    return (
      <div className="w-full h-[350px] p-4">
        <h2 className="text-center font-bold text-lg mb-4">DEMANDAS REALIZADAS E PENDENTES POR ÓRGÃO</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="empresa"
              interval={0}
              angle={0}
              textAnchor="middle"
              tick={{ fontSize: 12 }}
              height={50}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div>
                        <div className="bg-black text-white px-2 py-1 rounded text-xs">
                            {`${payload[0].name}: ${payload[0].value}`}
                            </div>
                            <div className="bg-black text-white px-2 py-1 rounded text-xs">
                            {`${payload[1].name}: ${payload[1].value}`}
                        </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="pendentes" name="Pendentes">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-pendentes-${index}`}
                  fill={entry.empresa === destaque ? '#000000' : coresPendentes[index % coresPendentes.length]}
                />
              ))}
            </Bar>
            <Bar dataKey="realizadas" name="Realizadas">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-realizadas-${index}`}
                  fill={entry.empresa === destaque ? '#4b5563' : coresRealizadas[index % coresRealizadas.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }