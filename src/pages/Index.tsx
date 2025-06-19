
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { KitMarca } from "@/components/branding/KitMarca";
import { Button } from "@/components/ui/button";
import { Star, LogIn } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // If not loading and no user, we're not authenticated
      // Show landing page instead of redirecting immediately
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl text-slate-400">Carregando...</h3>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto">
          <Star className="w-20 h-20 text-cyan-400 mx-auto mb-8 icon-glow" fill="currentColor" />
          <h1 className="text-5xl font-bold text-white mb-6 glow">
            Sirius
          </h1>
          <p className="text-xl text-cyan-300 mb-8 leading-relaxed">
            Sua plataforma de branding cósmica. Crie, gerencie e organize a identidade das suas marcas com elegância estelar.
          </p>
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/auth')}
              className="sirius-button px-8 py-4 text-lg"
            >
              <LogIn className="w-5 h-5 mr-3" />
              Começar Agora
            </Button>
            <p className="text-slate-400 text-sm">
              Crie sua conta gratuita e comece a transformar suas marcas
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <KitMarca />
    </div>
  );
};

export default Index;
