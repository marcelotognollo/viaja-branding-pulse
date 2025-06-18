
import { ArrowLeft, Edit, Download } from "lucide-react";
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
}

interface BrandViewProps {
  brand: Brand;
  onBack: () => void;
  onEdit: () => void;
}

export function BrandView({ brand, onBack, onEdit }: BrandViewProps) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-blue-300 hover:text-white hover:bg-blue-600/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">{brand.name}</h1>
            <p className="text-blue-200">{brand.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={onEdit}
            variant="outline"
            className="border-blue-500/30 text-blue-300 hover:bg-blue-600/20 hover:text-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-blue-900/20">
          <TabsTrigger value="branding" className="text-blue-200 data-[state=active]:bg-blue-600/30 data-[state=active]:text-white">
            Branding
          </TabsTrigger>
          <TabsTrigger value="visual" className="text-blue-200 data-[state=active]:bg-blue-600/30 data-[state=active]:text-white">
            Identidade Visual
          </TabsTrigger>
          <TabsTrigger value="atmosphere" className="text-blue-200 data-[state=active]:bg-blue-600/30 data-[state=active]:text-white">
            Atmosfera
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">Personalidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brand.personality.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-600/20 text-blue-200 rounded-full text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">Tom de Voz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200">{brand.toneOfVoice}</p>
              </CardContent>
            </Card>

            <Card className="glass border-blue-500/30 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Público-Alvo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-200">{brand.targetAudience}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visual" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">Paleta de Cores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-blue-200 font-medium mb-2">Cores Principais</h4>
                  <div className="flex gap-2">
                    {brand.primaryColors.map((color, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="w-12 h-12 rounded-lg border border-white/20 mb-1"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-blue-300">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-blue-200 font-medium mb-2">Cores Secundárias</h4>
                  <div className="flex gap-2">
                    {brand.secondaryColors.map((color, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="w-12 h-12 rounded-lg border border-white/20 mb-1"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs text-blue-300">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">Tipografia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-blue-300 text-sm">Título:</span>
                  <p className="text-white font-medium">{brand.typography.title || "Não definido"}</p>
                </div>
                <div>
                  <span className="text-blue-300 text-sm">Corpo:</span>
                  <p className="text-white">{brand.typography.body || "Não definido"}</p>
                </div>
                <div>
                  <span className="text-blue-300 text-sm">Destaque:</span>
                  <p className="text-white font-bold">{brand.typography.accent || "Não definido"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="atmosphere" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">Aromas e Sensações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brand.atmosphere.scents.map((scent, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-600/20 text-green-200 rounded-full text-sm"
                    >
                      {scent}
                    </span>
                  ))}
                  {brand.atmosphere.scents.length === 0 && (
                    <span className="text-blue-300 text-sm">Nenhum aroma definido</span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">Ambientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brand.atmosphere.environments.map((env, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600/20 text-purple-200 rounded-full text-sm"
                    >
                      {env}
                    </span>
                  ))}
                  {brand.atmosphere.environments.length === 0 && (
                    <span className="text-blue-300 text-sm">Nenhum ambiente definido</span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">Trilhas Musicais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brand.atmosphere.playlists.map((playlist, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-600/20 text-orange-200 rounded-full text-sm"
                    >
                      {playlist}
                    </span>
                  ))}
                  {brand.atmosphere.playlists.length === 0 && (
                    <span className="text-blue-300 text-sm">Nenhuma trilha definida</span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">Referências Visuais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {brand.atmosphere.references.map((ref, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cyan-600/20 text-cyan-200 rounded-full text-sm"
                    >
                      {ref}
                    </span>
                  ))}
                  {brand.atmosphere.references.length === 0 && (
                    <span className="text-blue-300 text-sm">Nenhuma referência definida</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
