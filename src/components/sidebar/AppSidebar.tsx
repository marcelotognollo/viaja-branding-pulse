
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
  SidebarTrigger,
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
  LogOut
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
    <Sidebar className="border-r border-blue-500/20 bg-slate-900/40 backdrop-blur-xl">
      <SidebarHeader className="border-b border-blue-500/20 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">TravelPro</h2>
            <p className="text-xs text-blue-300">Gestão de Viagens</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300 text-xs uppercase tracking-wider">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full justify-start gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-600/30 to-blue-800/30 border border-blue-500/40 text-white shadow-lg shadow-blue-500/20"
                        : "text-blue-200 hover:bg-blue-900/20 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-blue-500/20 p-4">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-blue-900/20 text-blue-300 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-blue-900/20 text-blue-300 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3 p-2 rounded-lg bg-blue-900/20">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-blue-300">admin@travelpro.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
