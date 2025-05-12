import {
    PieChart,
    Pie,
    Cell,
  } from 'recharts';  

const COLORS = ['#9333ea', '#1e40af', '#ef4444'];

const mockData = {
    'CIDADE UNIVERSITÁRIA': {
        total: 23,
        solucionados: 0.6,
        pendentesComuns: 0.4,
        pendentesUrgentes: 0.2,
    },
    'CRUZ DAS ALMAS': {
        total: 12,
        solucionados: 0.5,
        pendentesComuns: 0.3,
        pendentesUrgentes: 0.2,
    },
    'MANGABEIRAS': {
        total: 17,
        solucionados: 0.4,
        pendentesComuns: 0.4,
        pendentesUrgentes: 0.2,
    },
    'PAJUÇARA': {
        total: 20,
        solucionados: 0.7,
        pendentesComuns: 0.2,
        pendentesUrgentes: 0.1,
    },
    'SANTA LUCIA': {
        total: 19,
        solucionados: 0.3,
        pendentesComuns: 0.5,
        pendentesUrgentes: 0.2,
    },
    'CANAÃ': {
        total: 6,
        solucionados: 0.5,
        pendentesComuns: 0.3,
        pendentesUrgentes: 0.2,
    },
    'FAROL': {
        total: 3,
        solucionados: 0.4,
        pendentesComuns: 0.4,
        pendentesUrgentes: 0.2,
    },
};

export default function ResumoBairro({ bairro }) {
  const info = mockData[bairro];

  if (!info) return <div>Bairro não encontrado</div>;

  const pieData = [
    { name: 'Solucionados', value: info.solucionados },
    { name: 'Pend. Médias/Baixas', value: info.pendentesComuns },
    { name: 'Pend. Urgentes', value: info.pendentesUrgentes },
  ];

  return (
    <div className="p-4 w-[240px]">
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
