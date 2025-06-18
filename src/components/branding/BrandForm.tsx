
import { useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Brand {
  id?: string;
  name: string;
  description: string;
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

interface BrandFormProps {
  brand?: Brand | null;
  onSave: (brand: Partial<Brand>) => void;
  onCancel: () => void;
}

export function BrandForm({ brand, onSave, onCancel }: BrandFormProps) {
  const [formData, setFormData] = useState<Brand>({
    name: brand?.name || "",
    description: brand?.description || "",
    personality: brand?.personality || [],
    toneOfVoice: brand?.toneOfVoice || "",
    targetAudience: brand?.targetAudience || "",
    primaryColors: brand?.primaryColors || ["#1e3a8a"],
    secondaryColors: brand?.secondaryColors || ["#3b82f6"],
    typography: brand?.typography || {
      title: "",
      body: "",
      accent: ""
    },
    atmosphere: brand?.atmosphere || {
      scents: [],
      environments: [],
      playlists: [],
      references: []
    }
  });

  const [newPersonality, setNewPersonality] = useState("");
  const [newScent, setNewScent] = useState("");
  const [newEnvironment, setNewEnvironment] = useState("");
  const [newPlaylist, setNewPlaylist] = useState("");
  const [newReference, setNewReference] = useState("");

  const handleSave = () => {
    onSave(formData);
  };

  const addToArray = (field: keyof Brand, value: string, setterFn: (val: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }));
      setterFn("");
    }
  };

  const removeFromArray = (field: keyof Brand, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const addToAtmosphere = (field: keyof Brand['atmosphere'], value: string, setterFn: (val: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        atmosphere: {
          ...prev.atmosphere,
          [field]: [...prev.atmosphere[field], value.trim()]
        }
      }));
      setterFn("");
    }
  };

  const removeFromAtmosphere = (field: keyof Brand['atmosphere'], index: number) => {
    setFormData(prev => ({
      ...prev,
      atmosphere: {
        ...prev.atmosphere,
        [field]: prev.atmosphere[field].filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onCancel}
            className="text-blue-300 hover:text-white hover:bg-blue-600/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-white">
            {brand ? "Editar Marca" : "Nova Marca"}
          </h1>
        </div>
        <Button 
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar
        </Button>
      </div>

      <Card className="glass border-blue-500/30">
        <CardContent className="p-6">
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

            <TabsContent value="branding" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-blue-200">Nome da Marca</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-blue-900/20 border-blue-500/30 text-white"
                    placeholder="Ex: Viagens Premium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toneOfVoice" className="text-blue-200">Tom de Voz</Label>
                  <Input
                    id="toneOfVoice"
                    value={formData.toneOfVoice}
                    onChange={(e) => setFormData(prev => ({ ...prev, toneOfVoice: e.target.value }))}
                    className="bg-blue-900/20 border-blue-500/30 text-white"
                    placeholder="Ex: Informal e amigável"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-blue-200">Descrição Geral</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-blue-900/20 border-blue-500/30 text-white"
                  placeholder="Descreva o propósito e essência da marca"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience" className="text-blue-200">Público-Alvo</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                  className="bg-blue-900/20 border-blue-500/30 text-white"
                  placeholder="Ex: Jovens de 25-35 anos, classe média alta"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-blue-200">Características da Personalidade</Label>
                <div className="flex gap-2">
                  <Input
                    value={newPersonality}
                    onChange={(e) => setNewPersonality(e.target.value)}
                    className="bg-blue-900/20 border-blue-500/30 text-white"
                    placeholder="Ex: Empática, ousada..."
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('personality', newPersonality, setNewPersonality)}
                  />
                  <Button 
                    onClick={() => addToArray('personality', newPersonality, setNewPersonality)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Adicionar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.personality.map((trait, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-200 rounded-full text-sm"
                    >
                      {trait}
                      <button
                        onClick={() => removeFromArray('personality', index)}
                        className="text-red-300 hover:text-red-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="visual" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-blue-200">Cores Principais</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.primaryColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => {
                            const newColors = [...formData.primaryColors];
                            newColors[index] = e.target.value;
                            setFormData(prev => ({ ...prev, primaryColors: newColors }));
                          }}
                          className="w-8 h-8 rounded border border-blue-500/30"
                        />
                        <span className="text-blue-200 text-sm">{color}</span>
                        {formData.primaryColors.length > 1 && (
                          <button
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                primaryColors: prev.primaryColors.filter((_, i) => i !== index)
                              }));
                            }}
                            className="text-red-300 hover:text-red-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                    <Button
                      onClick={() => setFormData(prev => ({ ...prev, primaryColors: [...prev.primaryColors, "#1e3a8a"] }))}
                      className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1"
                    >
                      + Cor
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-blue-200">Cores Secundárias</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.secondaryColors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => {
                            const newColors = [...formData.secondaryColors];
                            newColors[index] = e.target.value;
                            setFormData(prev => ({ ...prev, secondaryColors: newColors }));
                          }}
                          className="w-8 h-8 rounded border border-blue-500/30"
                        />
                        <span className="text-blue-200 text-sm">{color}</span>
                        {formData.secondaryColors.length > 1 && (
                          <button
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                secondaryColors: prev.secondaryColors.filter((_, i) => i !== index)
                              }));
                            }}
                            className="text-red-300 hover:text-red-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                    <Button
                      onClick={() => setFormData(prev => ({ ...prev, secondaryColors: [...prev.secondaryColors, "#3b82f6"] }))}
                      className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1"
                    >
                      + Cor
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="titleFont" className="text-blue-200">Fonte Título</Label>
                  <Input
                    id="titleFont"
                    value={formData.typography.title}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      typography: { ...prev.typography, title: e.target.value }
                    }))}
                    className="bg-blue-900/20 border-blue-500/30 text-white"
                    placeholder="Ex: Montserrat"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodyFont" className="text-blue-200">Fonte Corpo</Label>
                  <Input
                    id="bodyFont"
                    value={formData.typography.body}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      typography: { ...prev.typography, body: e.target.value }
                    }))}
                    className="bg-blue-900/20 border-blue-500/30 text-white"
                    placeholder="Ex: Inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentFont" className="text-blue-200">Fonte Destaque</Label>
                  <Input
                    id="accentFont"
                    value={formData.typography.accent}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      typography: { ...prev.typography, accent: e.target.value }
                    }))}
                    className="bg-blue-900/20 border-blue-500/30 text-white"
                    placeholder="Ex: Poppins"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="atmosphere" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-blue-200">Aromas e Sensações</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newScent}
                      onChange={(e) => setNewScent(e.target.value)}
                      className="bg-blue-900/20 border-blue-500/30 text-white"
                      placeholder="Ex: Lavanda, Vanilla..."
                      onKeyPress={(e) => e.key === 'Enter' && addToAtmosphere('scents', newScent, setNewScent)}
                    />
                    <Button 
                      onClick={() => addToAtmosphere('scents', newScent, setNewScent)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      +
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.atmosphere.scents.map((scent, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-200 rounded-full text-sm"
                      >
                        {scent}
                        <button
                          onClick={() => removeFromAtmosphere('scents', index)}
                          className="text-red-300 hover:text-red-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-blue-200">Ambientes</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newEnvironment}
                      onChange={(e) => setNewEnvironment(e.target.value)}
                      className="bg-blue-900/20 border-blue-500/30 text-white"
                      placeholder="Ex: Praia, Montanha..."
                      onKeyPress={(e) => e.key === 'Enter' && addToAtmosphere('environments', newEnvironment, setNewEnvironment)}
                    />
                    <Button 
                      onClick={() => addToAtmosphere('environments', newEnvironment, setNewEnvironment)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      +
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.atmosphere.environments.map((env, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-200 rounded-full text-sm"
                      >
                        {env}
                        <button
                          onClick={() => removeFromAtmosphere('environments', index)}
                          className="text-red-300 hover:text-red-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-blue-200">Playlists/Trilhas</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newPlaylist}
                      onChange={(e) => setNewPlaylist(e.target.value)}
                      className="bg-blue-900/20 border-blue-500/30 text-white"
                      placeholder="Ex: Jazz Lounge, Rock..."
                      onKeyPress={(e) => e.key === 'Enter' && addToAtmosphere('playlists', newPlaylist, setNewPlaylist)}
                    />
                    <Button 
                      onClick={() => addToAtmosphere('playlists', newPlaylist, setNewPlaylist)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      +
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.atmosphere.playlists.map((playlist, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-200 rounded-full text-sm"
                      >
                        {playlist}
                        <button
                          onClick={() => removeFromAtmosphere('playlists', index)}
                          className="text-red-300 hover:text-red-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-blue-200">Referências Visuais</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newReference}
                      onChange={(e) => setNewReference(e.target.value)}
                      className="bg-blue-900/20 border-blue-500/30 text-white"
                      placeholder="Ex: Apple, Nike..."
                      onKeyPress={(e) => e.key === 'Enter' && addToAtmosphere('references', newReference, setNewReference)}
                    />
                    <Button 
                      onClick={() => addToAtmosphere('references', newReference, setNewReference)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      +
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.atmosphere.references.map((ref, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-200 rounded-full text-sm"
                      >
                        {ref}
                        <button
                          onClick={() => removeFromAtmosphere('references', index)}
                          className="text-red-300 hover:text-red-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
