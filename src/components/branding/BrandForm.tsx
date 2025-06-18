
import { useState } from "react";
import { ArrowLeft, Save, Upload, Palette, Type, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

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
  logos: {
    primary: string;
    horizontal: string;
    favicon: string;
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
    primaryColors: brand?.primaryColors || ["#0b1c3b"],
    secondaryColors: brand?.secondaryColors || ["#66ccff"],
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
    },
    logos: brand?.logos || {
      primary: "",
      horizontal: "",
      favicon: ""
    }
  });

  const [expandedSections, setExpandedSections] = useState({
    branding: true,
    visual: true,
    atmosphere: true
  });

  const handleSave = () => {
    onSave(formData);
  };

  const addToArray = (path: string, value: string) => {
    if (value.trim()) {
      if (path.includes('.')) {
        const [parent, child] = path.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev[parent as keyof Brand] as any),
            [child]: [...((prev[parent as keyof Brand] as any)[child] || []), value.trim()]
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [path]: [...(prev[path as keyof Brand] as string[]), value.trim()]
        }));
      }
    }
  };

  const removeFromArray = (path: string, index: number) => {
    if (path.includes('.')) {
      const [parent, child] = path.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Brand] as any),
          [child]: ((prev[parent as keyof Brand] as any)[child] || []).filter((_: any, i: number) => i !== index)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [path]: (prev[path as keyof Brand] as string[]).filter((_, i) => i !== index)
      }));
    }
  };

  const ArrayInput = ({ 
    path, 
    placeholder, 
    items, 
    colorClass = "bg-cyan-500/20 text-cyan-200" 
  }: { 
    path: string; 
    placeholder: string; 
    items: string[];
    colorClass?: string;
  }) => {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="sirius-input"
            placeholder={placeholder}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addToArray(path, value);
                setValue("");
              }
            }}
          />
          <Button 
            onClick={() => {
              addToArray(path, value);
              setValue("");
            }}
            className="sirius-button px-4"
          >
            +
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={index}
              className={`flex items-center gap-2 px-3 py-2 ${colorClass} rounded-lg text-sm font-medium`}
            >
              {item}
              <button
                onClick={() => removeFromArray(path, index)}
                className="text-red-300 hover:text-red-200 ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            onClick={onCancel}
            className="text-cyan-300 hover:text-white hover:bg-slate-800/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-white glow">
              {brand ? "Editar Marca" : "Nova Marca"}
            </h1>
            <p className="text-cyan-300 mt-2">Configure todos os aspectos da identidade da marca</p>
          </div>
        </div>
        <Button 
          onClick={handleSave}
          className="sirius-button px-8 py-3 text-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Salvar Marca
        </Button>
      </div>

      {/* Form Content */}
      <div className="space-y-8">
        {/* Basic Info */}
        <Card className="sirius-card">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-cyan-400 icon-glow" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-cyan-200 font-medium">Nome da Marca</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="sirius-input text-lg"
                  placeholder="Ex: Viagens Premium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toneOfVoice" className="text-cyan-200 font-medium">Tom de Voz</Label>
                <Input
                  id="toneOfVoice"
                  value={formData.toneOfVoice}
                  onChange={(e) => setFormData(prev => ({ ...prev, toneOfVoice: e.target.value }))}
                  className="sirius-input"
                  placeholder="Ex: Informal e amigável"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-cyan-200 font-medium">Descrição da Marca</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="sirius-input min-h-[100px]"
                placeholder="Descreva o propósito, essência e missão da marca..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-cyan-200 font-medium">Público-Alvo</Label>
              <Textarea
                value={formData.targetAudience}
                onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                className="sirius-input"
                placeholder="Ex: Jovens de 25-35 anos, classe média alta, interessados em experiências autênticas..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Branding Section */}
        <Collapsible open={expandedSections.branding} onOpenChange={(open) => setExpandedSections(prev => ({ ...prev, branding: open }))}>
          <CollapsibleTrigger asChild>
            <Card className="sirius-card cursor-pointer hover:bg-slate-800/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Palette className="w-6 h-6 text-purple-400 icon-glow" />
                    Personalidade & Branding
                  </div>
                  <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform ${expandedSections.branding ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="sirius-card mt-4">
              <CardContent className="space-y-8 pt-6">
                <div>
                  <Label className="text-cyan-200 font-medium text-lg mb-4 block">Características da Personalidade</Label>
                  <p className="text-slate-400 text-sm mb-4">Defina os traços que melhor representam a marca</p>
                  <ArrayInput
                    path="personality"
                    placeholder="Ex: Empática, ousada, confiável..."
                    items={formData.personality}
                    colorClass="bg-purple-500/20 text-purple-200"
                  />
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Visual Identity Section */}
        <Collapsible open={expandedSections.visual} onOpenChange={(open) => setExpandedSections(prev => ({ ...prev, visual: open }))}>
          <CollapsibleTrigger asChild>
            <Card className="sirius-card cursor-pointer hover:bg-slate-800/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Eye className="w-6 h-6 text-cyan-400 icon-glow" />
                    Identidade Visual
                  </div>
                  <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform ${expandedSections.visual ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="sirius-card mt-4">
              <CardContent className="space-y-8 pt-6">
                {/* Logo Upload Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <Label className="text-cyan-200 font-medium">Logo Principal</Label>
                    <div className="border-2 border-dashed border-cyan-400/30 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-colors">
                      <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                      <p className="text-sm text-slate-400">PNG ou SVG</p>
                      <p className="text-xs text-slate-500">Recomendado: quadrado</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-cyan-200 font-medium">Logo Horizontal</Label>
                    <div className="border-2 border-dashed border-cyan-400/30 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-colors">
                      <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                      <p className="text-sm text-slate-400">PNG ou SVG</p>
                      <p className="text-xs text-slate-500">Recomendado: retângulo</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-cyan-200 font-medium">Favicon</Label>
                    <div className="border-2 border-dashed border-cyan-400/30 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-colors">
                      <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                      <p className="text-sm text-slate-400">PNG ou ICO</p>
                      <p className="text-xs text-slate-500">32x32 ou 64x64px</p>
                    </div>
                  </div>
                </div>

                {/* Colors Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label className="text-cyan-200 font-medium text-lg">Cores Principais</Label>
                    <div className="flex flex-wrap gap-3">
                      {formData.primaryColors.map((color, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => {
                              const newColors = [...formData.primaryColors];
                              newColors[index] = e.target.value;
                              setFormData(prev => ({ ...prev, primaryColors: newColors }));
                            }}
                            className="w-12 h-12 rounded-lg border-2 border-cyan-400/30 cursor-pointer"
                          />
                          <div>
                            <span className="text-white font-medium block">{color.toUpperCase()}</span>
                            <span className="text-slate-400 text-xs">Principal {index + 1}</span>
                          </div>
                          {formData.primaryColors.length > 1 && (
                            <button
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  primaryColors: prev.primaryColors.filter((_, i) => i !== index)
                                }));
                              }}
                              className="text-red-300 hover:text-red-200 ml-2"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      <Button
                        onClick={() => setFormData(prev => ({ ...prev, primaryColors: [...prev.primaryColors, "#0b1c3b"] }))}
                        className="h-12 w-12 rounded-lg border-2 border-dashed border-cyan-400/30 bg-transparent hover:border-cyan-400/50 hover:bg-cyan-400/5"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-cyan-200 font-medium text-lg">Cores Secundárias</Label>
                    <div className="flex flex-wrap gap-3">
                      {formData.secondaryColors.map((color, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => {
                              const newColors = [...formData.secondaryColors];
                              newColors[index] = e.target.value;
                              setFormData(prev => ({ ...prev, secondaryColors: newColors }));
                            }}
                            className="w-12 h-12 rounded-lg border-2 border-cyan-400/30 cursor-pointer"
                          />
                          <div>
                            <span className="text-white font-medium block">{color.toUpperCase()}</span>
                            <span className="text-slate-400 text-xs">Secundária {index + 1}</span>
                          </div>
                          <button
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                secondaryColors: prev.secondaryColors.filter((_, i) => i !== index)
                              }));
                            }}
                            className="text-red-300 hover:text-red-200 ml-2"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <Button
                        onClick={() => setFormData(prev => ({ ...prev, secondaryColors: [...prev.secondaryColors, "#66ccff"] }))}
                        className="h-12 w-12 rounded-lg border-2 border-dashed border-cyan-400/30 bg-transparent hover:border-cyan-400/50 hover:bg-cyan-400/5"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Typography Section */}
                <div className="space-y-4">
                  <Label className="text-cyan-200 font-medium text-lg flex items-center gap-2">
                    <Type className="w-5 h-5" />
                    Tipografia
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="titleFont" className="text-slate-300">Fonte para Títulos</Label>
                      <Input
                        id="titleFont"
                        value={formData.typography.title}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          typography: { ...prev.typography, title: e.target.value }
                        }))}
                        className="sirius-input"
                        placeholder="Ex: Montserrat"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bodyFont" className="text-slate-300">Fonte para Corpo</Label>
                      <Input
                        id="bodyFont"
                        value={formData.typography.body}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          typography: { ...prev.typography, body: e.target.value }
                        }))}
                        className="sirius-input"
                        placeholder="Ex: Inter"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accentFont" className="text-slate-300">Fonte para Destaque</Label>
                      <Input
                        id="accentFont"
                        value={formData.typography.accent}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          typography: { ...prev.typography, accent: e.target.value }
                        }))}
                        className="sirius-input"
                        placeholder="Ex: Poppins"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Atmosphere Section */}
        <Collapsible open={expandedSections.atmosphere} onOpenChange={(open) => setExpandedSections(prev => ({ ...prev, atmosphere: open }))}>
          <CollapsibleTrigger asChild>
            <Card className="sirius-card cursor-pointer hover:bg-slate-800/30 transition-colors">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-purple-400 icon-glow" />
                    Atmosfera & Inspiração
                  </div>
                  <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform ${expandedSections.atmosphere ? 'rotate-180' : ''}`} />
                </CardTitle>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="sirius-card mt-4">
              <CardContent className="space-y-8 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label className="text-cyan-200 font-medium text-lg mb-4 block">Aromas e Sensações</Label>
                    <p className="text-slate-400 text-sm mb-4">Que sensações olfativas e táteis a marca evoca?</p>
                    <ArrayInput
                      path="atmosphere.scents"
                      placeholder="Ex: Lavanda, Vanilla, Oceano..."
                      items={formData.atmosphere.scents}
                      colorClass="bg-green-500/20 text-green-200"
                    />
                  </div>

                  <div>
                    <Label className="text-cyan-200 font-medium text-lg mb-4 block">Ambientes</Label>
                    <p className="text-slate-400 text-sm mb-4">Onde a marca se sentiria em casa?</p>
                    <ArrayInput
                      path="atmosphere.environments"
                      placeholder="Ex: Praia, Montanha, Cidade..."
                      items={formData.atmosphere.environments}
                      colorClass="bg-orange-500/20 text-orange-200"
                    />
                  </div>

                  <div>
                    <Label className="text-cyan-200 font-medium text-lg mb-4 block">Trilhas Musicais</Label>
                    <p className="text-slate-400 text-sm mb-4">Que estilos musicais combinam com a marca?</p>
                    <ArrayInput
                      path="atmosphere.playlists"
                      placeholder="Ex: Jazz Lounge, Rock Indie..."
                      items={formData.atmosphere.playlists}
                      colorClass="bg-pink-500/20 text-pink-200"
                    />
                  </div>

                  <div>
                    <Label className="text-cyan-200 font-medium text-lg mb-4 block">Referências Visuais</Label>
                    <p className="text-slate-400 text-sm mb-4">Que marcas ou estilos servem de inspiração?</p>
                    <ArrayInput
                      path="atmosphere.references"
                      placeholder="Ex: Apple, Airbnb, Patagonia..."
                      items={formData.atmosphere.references}
                      colorClass="bg-cyan-500/20 text-cyan-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
