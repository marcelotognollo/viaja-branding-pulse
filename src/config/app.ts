
export const APP_CONFIG = {
  name: "TravelPro",
  description: "Sistema de Gestão para Agências de Viagens",
  version: "1.0.0",
  
  // User roles for future auth implementation
  roles: {
    ADMIN: "admin",
    PREMIUM_AGENT: "premium_agent", 
    STANDARD_AGENT: "standard_agent"
  },

  // Module permissions
  permissions: {
    dashboard: ["admin", "premium_agent", "standard_agent"],
    orcamentos: ["admin", "premium_agent", "standard_agent"],
    roteiros: ["admin", "premium_agent", "standard_agent"],
    contratos: ["admin", "premium_agent"],
    crm: ["admin", "premium_agent", "standard_agent"],
    financeiro: ["admin", "premium_agent"],
    marketing: ["admin", "premium_agent"],
    tarefas: ["admin", "premium_agent", "standard_agent"],
    "kit-marca": ["admin", "premium_agent"],
    editorial: ["admin", "premium_agent"]
  },

  // Supabase table structure (for future implementation)
  database: {
    tables: {
      users: "profiles",
      budgets: "orcamentos", 
      itineraries: "roteiros",
      contracts: "contratos",
      clients: "clientes",
      transactions: "transacoes",
      tasks: "tarefas",
      brand_assets: "assets_marca",
      content_calendar: "calendario_conteudo"
    }
  }
};
