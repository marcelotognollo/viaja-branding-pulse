
import { Clock, CheckCircle, AlertCircle, User, FileText } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "budget",
    title: "Novo orçamento criado",
    description: "Viagem para Europa - Cliente: Maria Silva",
    time: "2h atrás",
    icon: FileText,
    status: "new"
  },
  {
    id: 2,
    type: "contract",
    title: "Contrato aprovado",
    description: "Pacote Caribe - João Santos",
    time: "4h atrás",
    icon: CheckCircle,
    status: "approved"
  },
  {
    id: 3,
    type: "client",
    title: "Novo cliente cadastrado",
    description: "Ana Costa - Premium",
    time: "6h atrás",
    icon: User,
    status: "new"
  },
  {
    id: 4,
    type: "alert",
    title: "Pagamento pendente",
    description: "Fatura vencendo em 2 dias",
    time: "1d atrás",
    icon: AlertCircle,
    status: "warning"
  },
  {
    id: 5,
    type: "budget",
    title: "Orçamento em análise",
    description: "Destino: Tailândia - Cliente VIP",
    time: "2d atrás",
    icon: Clock,
    status: "pending"
  },
];

export function RecentActivity() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400 bg-green-500/20";
      case "warning":
        return "text-yellow-400 bg-yellow-500/20";
      case "pending":
        return "text-blue-400 bg-blue-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Atividades Recentes</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          Ver todas
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="group relative">
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <button className="w-full py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
          Carregar mais atividades
        </button>
      </div>
    </div>
  );
}
