
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
}

export function KPICard({ title, value, change, trend, description }: KPICardProps) {
  return (
    <div className="group relative">
      {/* Glassmorphism Card */}
      <div className="relative p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-300">{title}</h3>
            <div className={`p-1.5 rounded-lg ${
              trend === "up" 
                ? "bg-green-500/20 text-green-400" 
                : "bg-red-500/20 text-red-400"
            }`}>
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-3xl font-bold text-white">{value}</p>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${
                trend === "up" ? "text-green-400" : "text-red-400"
              }`}>
                {change}
              </span>
              <span className="text-xs text-gray-400">{description}</span>
            </div>
          </div>
        </div>

        {/* Subtle animation glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}
