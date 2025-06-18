
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  FileText, 
  MapPin, 
  FileSignature, 
  Users, 
  DollarSign, 
  Megaphone, 
  CheckSquare,
  Palette,
  Calendar,
  Settings,
  LogOut,
  Star
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    id: "dashboard",
  },
  {
    title: "Orçamentos",
    icon: FileText,
    id: "orcamentos",
  },
  {
    title: "Roteiros",
    icon: MapPin,
    id: "roteiros",
  },
  {
    title: "Contratos",
    icon: FileSignature,
    id: "contratos",
  },
  {
    title: "CRM - Clientes",
    icon: Users,
    id: "crm",
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    id: "financeiro",
  },
  {
    title: "Marketing",
    icon: Megaphone,
    id: "marketing",
  },
  {
    title: "Tarefas",
    icon: CheckSquare,
    id: "tarefas",
  },
  {
    title: "Kit de Marca",
    icon: Palette,
    id: "kit-marca",
  },
  {
    title: "Editorial",
    icon: Calendar,
    id: "editorial",
  },
];

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-cyan-400/20 sirius-gradient backdrop-blur-xl">
      <SidebarHeader className="border-b border-cyan-400/20 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center relative">
            <Star className="w-5 h-5 text-white icon-glow" fill="currentColor" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-md"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white glow">Sirius</h2>
            <p className="text-xs text-cyan-300">Gestão de Viagens</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-cyan-300 text-xs uppercase tracking-wider font-medium">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full justify-start gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border border-cyan-400/40 text-white shadow-lg shadow-cyan-500/20"
                        : "text-slate-300 hover:bg-slate-800/30 hover:text-white hover:border hover:border-cyan-400/20"
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${activeSection === item.id ? 'icon-glow' : ''}`} />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-cyan-400/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-slate-800/30 text-slate-300 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-800/30 text-slate-300 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl sirius-card">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-cyan-300">admin@sirius.app</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
