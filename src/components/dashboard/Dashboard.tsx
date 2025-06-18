
import { KPICard } from "./KPICard";
import { ChartContainer } from "./ChartContainer";
import { RecentActivity } from "./RecentActivity";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search } from "lucide-react";

export function Dashboard() {
  const kpis = [
    {
      title: "Orçamentos Ativos",
      value: "127",
      change: "+12%",
      trend: "up" as const,
      description: "vs. mês anterior",
    },
    {
      title: "Receita do Mês",
      value: "R$ 485.2K",
      change: "+8.2%",
      trend: "up" as const,
      description: "vs. mês anterior",
    },
    {
      title: "Clientes Ativos",
      value: "1,429",
      change: "+5.4%",
      trend: "up" as const,
      description: "vs. mês anterior",
    },
    {
      title: "Taxa de Conversão",
      value: "73.2%",
      change: "-2.1%",
      trend: "down" as const,
      description: "vs. mês anterior",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-white hover:bg-white/10" />
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">Visão geral do sistema</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              />
            </div>
            <button className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartContainer />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
