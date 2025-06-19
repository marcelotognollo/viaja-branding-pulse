import { ArrowLeft, Edit, Download, Star, Palette, Type, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface Brand {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  personality: string[];
  toneOfVoice: string;
  targetAudience: string;
  primaryColors: string[];
  secondaryColors: string[];
  typography: {
    title: string;
    body: string;
    accent: string;
  };
  atmosphere: {
    scents: string[];
    environments: string[];
    playlists: string[];
    references: string[];
  };
  logos?: {
    primary: string;
    horizontal: string;
    favicon: string;
  };
}
interface BrandViewProps {
  brand: Brand;
  onBack: () => void;
  onEdit: () => void;
}
export function BrandView({
  brand,
  onBack,
  onEdit
}: BrandViewProps) {
  return <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" onClick={onBack} className="text-cyan-300 hover:text-white hover:bg-slate-800/30">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-4 glow">
              <Star className="w-8 h-8 text-cyan-400 icon-glow" fill="currentColor" />
              {brand.name}
            </h1>
            <p className="text-cyan-300 mt-2 text-lg">{brand.description}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button onClick={onEdit} variant="outline" className="border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/20 hover:text-white px-6 py-3">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button className="sirius-button px-6 py-3">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sirius-card mb-8 py-[2px]">
          <TabsTrigger value="branding" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/30 data-[state=active]:to-purple-500/30 data-[state=active]:text-white py-[6px]">
            <Palette className="w-4 h-4 mr-2" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="visual" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/30 data-[state=active]:to-purple-500/30 data-[state=active]:text-white">
            <Type className="w-4 h-4 mr-2" />
            Identidade Visual
          </TabsTrigger>
          <TabsTrigger value="atmosphere" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/30 data-[state=active]:to-purple-500/30 data-[state=active]:text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            Atmosfera
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="sirius-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Star className="w-5 h-5 text-purple-400" />
                  Personalidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {brand.personality.map((trait, index) => <span key={index} className="px-4 py-2 bg-purple-500/20 text-purple-200 rounded-lg text-sm font-medium">
                      {trait}
                    </span>)}
                </div>
              </CardContent>
            </Card>

            <Card className="sirius-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  Tom de Voz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">{brand.toneOfVoice}</p>
              </CardContent>
            </Card>

            <Card className="sirius-card md:col-span-2">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Star className="w-5 h-5 text-cyan-400" />
                  Público-Alvo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">{brand.targetAudience}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visual" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="sirius-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Palette className="w-5 h-5 text-cyan-400" />
                  Paleta de Cores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-cyan-200 font-medium mb-4 text-lg">Cores Principais</h4>
                  <div className="flex gap-4">
                    {brand.primaryColors.map((color, index) => <div key={index} className="text-center">
                        <div className="w-16 h-16 rounded-xl border-2 border-white/20 mb-2 shadow-lg" style={{
                      backgroundColor: color
                    }} />
                        <span className="text-xs text-cyan-300 font-mono">{color.toUpperCase()}</span>
                      </div>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-cyan-200 font-medium mb-4 text-lg">Cores Secundárias</h4>
                  <div className="flex gap-4">
                    {brand.secondaryColors.map((color, index) => <div key={index} className="text-center">
                        <div className="w-16 h-16 rounded-xl border-2 border-white/20 mb-2 shadow-lg" style={{
                      backgroundColor: color
                    }} />
                        <span className="text-xs text-cyan-300 font-mono">{color.toUpperCase()}</span>
                      </div>)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="sirius-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Type className="w-5 h-5 text-purple-400" />
                  Tipografia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-800/50">
                  <span className="text-cyan-300 text-sm font-medium">Título:</span>
                  <p className="text-white font-bold text-lg mt-1">
                    {brand.typography.title || "Não definido"}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50">
                  <span className="text-cyan-300 text-sm font-medium">Corpo:</span>
                  <p className="text-white mt-1">
                    {brand.typography.body || "Não definido"}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50">
                  <span className="text-cyan-300 text-sm font-medium">Destaque:</span>
                  <p className="text-white font-semibold mt-1">
                    {brand.typography.accent || "Não definido"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="atmosphere" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="sirius-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-green-400" />
                  Aromas e Sensações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brand.atmosphere.scents.map((scent, index) => <span key={index} className="px-3 py-2 bg-green-500/20 text-green-200 rounded-lg text-sm font-medium">
                      {scent}
                    </span>)}
                  {brand.atmosphere.scents.length === 0 && <span className="text-slate-400 text-sm italic">Nenhum aroma definido</span>}
                </div>
              </CardContent>
            </Card>

            <Card className="sirius-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Star className="w-5 h-5 text-orange-400" />
                  Ambientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brand.atmosphere.environments.map((env, index) => <span key={index} className="px-3 py-2 bg-orange-500/20 text-orange-200 rounded-lg text-sm font-medium">
                      {env}
                    </span>)}
                  {brand.atmosphere.environments.length === 0 && <span className="text-slate-400 text-sm italic">Nenhum ambiente definido</span>}
                </div>
              </CardContent>
            </Card>

            <Card className="sirius-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  Trilhas Musicais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brand.atmosphere.playlists.map((playlist, index) => <span key={index} className="px-3 py-2 bg-pink-500/20 text-pink-200 rounded-lg text-sm font-medium">
                      {playlist}
                    </span>)}
                  {brand.atmosphere.playlists.length === 0 && <span className="text-slate-400 text-sm italic">Nenhuma trilha definida</span>}
                </div>
              </CardContent>
            </Card>

            <Card className="sirius-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Star className="w-5 h-5 text-cyan-400" />
                  Referências Visuais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brand.atmosphere.references.map((ref, index) => <span key={index} className="px-3 py-2 bg-cyan-500/20 text-cyan-200 rounded-lg text-sm font-medium">
                      {ref}
                    </span>)}
                  {brand.atmosphere.references.length === 0 && <span className="text-slate-400 text-sm italic">Nenhuma referência definida</span>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
}