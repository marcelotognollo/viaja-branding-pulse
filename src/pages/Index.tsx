
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "orcamentos":
        return <div className="p-6"><h2 className="text-2xl font-bold text-white mb-4">Orçamentos</h2><p className="text-gray-300">Gestão de orçamentos em desenvolvimento...</p></div>;
      case "roteiros":
        return <div className="p-6"><h2 className="text-2xl font-bold text-white mb-4">Roteiros</h2><p className="text-gray-300">Gestão de roteiros em desenvolvimento...</p></div>;
      case "contratos":
        return <div className="p-6"><h2 className="text-2xl font-bold text-white mb-4">Contratos</h2><p className="text-gray-300">Gestão de contratos em desenvolvimento...</p></div>;
      case "crm":
        return <div className="p-6"><h2 className="text-2xl font-bold text-white mb-4">CRM - Clientes</h2><p className="text-gray-300">Sistema de CRM em desenvolvimento...</p></div>;
      case "financeiro":
        return <div className="p-6"><h2 className="text-2xl font-bold text-white mb-4">Financeiro</h2><p className="text-gray-300">Módulo financeiro em desenvolvimento...</p></div>;
      case "marketing":
        return <div className="p-6"><h2 className="text-2xl font-bold text-white mb-4">Marketing</h2><p className="text-gray-300">Ferramentas de marketing em desenvolvimento...</p></div>;
      case "tarefas":
        return <div className="p-6"><h2 className="text-2xl font-bold text-white mb-4">Tarefas</h2><p className="text-gray-300">Gestão de tarefas em desenvolvimento...</p></div>;
      case "kit-marca":
        return <div className="p-6"><h2 className="text-2xl font-bold text-white mb-4">Kit de Marca</h2><p className="text-gray-300">Biblioteca de marca em desenvolvimento...</p></div>;
      case "editorial":
        return <div className="p-6"><h2 className="text-2xl font-bold text-white mb-4">Editorial de Conteúdo</h2><p className="text-gray-300">Gestão de conteúdo em desenvolvimento...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="travel-agency-theme">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="flex-1 overflow-auto">
              <div className="min-h-screen backdrop-blur-sm bg-black/10">
                {renderContent()}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  );
};

export default Index;
