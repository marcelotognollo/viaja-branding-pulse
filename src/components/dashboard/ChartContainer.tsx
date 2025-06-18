
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', receita: 45000, orcamentos: 24 },
  { name: 'Fev', receita: 52000, orcamentos: 28 },
  { name: 'Mar', receita: 48000, orcamentos: 26 },
  { name: 'Abr', receita: 61000, orcamentos: 32 },
  { name: 'Mai', receita: 55000, orcamentos: 30 },
  { name: 'Jun', receita: 67000, orcamentos: 35 },
];

export function ChartContainer() {
  return (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Receita por Mês</h3>
            <p className="text-gray-400">Evolução dos últimos 6 meses</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-300">Receita</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <Bar 
                dataKey="receita" 
                fill="url(#blueGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budgets Chart */}
      <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Orçamentos Criados</h3>
            <p className="text-gray-400">Tendência mensal</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-300">Orçamentos</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                fontSize={12}
              />
              <Line 
                type="monotone" 
                dataKey="orcamentos" 
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
