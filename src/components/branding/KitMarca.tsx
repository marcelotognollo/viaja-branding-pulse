
import { useState } from "react";
import { Plus, Edit, Trash2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandForm } from "./BrandForm";
import { BrandView } from "./BrandView";

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

const mockBrands: Brand[] = [
  {
    id: "1",
    name: "Viagens Luxo",
    description: "Marca premium para viagens de alto padrão",
    createdAt: "2024-01-15",
    personality: ["Sofisticada", "Exclusiva", "Elegante"],
    toneOfVoice: "Formal e refinado",
    targetAudience: "Classe A, 35-55 anos, executivos",
    primaryColors: ["#1e3a8a", "#0f172a"],
    secondaryColors: ["#3b82f6", "#60a5fa"],
    typography: {
      title: "Playfair Display",
      body: "Inter",
      accent: "Montserrat"
    },
    atmosphere: {
      scents: ["Vanilla", "Lavanda"],
      environments: ["Hotel 5 estrelas", "Spa"],
      playlists: ["Jazz Instrumental", "Lounge"],
      references: ["Ritz Carlton", "Four Seasons"]
    }
  },
  {
    id: "2",
    name: "Aventura Jovem",
    description: "Marca voltada para viagens de aventura e mochilão",
    createdAt: "2024-02-01",
    personality: ["Aventureira", "Descontraída", "Autêntica"],
    toneOfVoice: "Informal e energético",
    targetAudience: "18-30 anos, universitários e jovens profissionais",
    primaryColors: ["#059669", "#0d9488"],
    secondaryColors: ["#10b981", "#34d399"],
    typography: {
      title: "Roboto Slab",
      body: "Open Sans",
      accent: "Poppins"
    },
    atmosphere: {
      scents: ["Eucalipto", "Menta"],
      environments: ["Montanhas", "Trilhas", "Hostels"],
      playlists: ["Pop Rock", "Indie"],
      references: ["Patagonia", "Red Bull"]
    }
  }
];

export function KitMarca() {
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [isCreating, setIsCreating] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [viewingBrand, setViewingBrand] = useState<Brand | null>(null);

  const handleCreateBrand = (brandData: Partial<Brand>) => {
    const newBrand: Brand = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      ...brandData as Brand
    };
    setBrands([...brands, newBrand]);
    setIsCreating(false);
  };

  const handleEditBrand = (brandData: Partial<Brand>) => {
    if (editingBrand) {
      setBrands(brands.map(brand => 
        brand.id === editingBrand.id 
          ? { ...brand, ...brandData }
          : brand
      ));
      setEditingBrand(null);
    }
  };

  const handleDeleteBrand = (brandId: string) => {
    setBrands(brands.filter(brand => brand.id !== brandId));
  };

  if (viewingBrand) {
    return (
      <BrandView 
        brand={viewingBrand} 
        onBack={() => setViewingBrand(null)}
        onEdit={() => {
          setEditingBrand(viewingBrand);
          setViewingBrand(null);
        }}
      />
    );
  }

  if (isCreating || editingBrand) {
    return (
      <BrandForm
        brand={editingBrand}
        onSave={editingBrand ? handleEditBrand : handleCreateBrand}
        onCancel={() => {
          setIsCreating(false);
          setEditingBrand(null);
        }}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Palette className="w-8 h-8 text-blue-400" />
            Kit de Marca
          </h1>
          <p className="text-blue-200 mt-2">
            Gerencie a identidade visual e atmosfera das suas marcas
          </p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Marca
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card 
            key={brand.id} 
            className="glass hover:bg-blue-900/20 border-blue-500/30 transition-all duration-300 cursor-pointer group"
            onClick={() => setViewingBrand(brand)}
          >
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                {brand.name}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingBrand(brand);
                    }}
                    className="text-blue-300 hover:text-white hover:bg-blue-600/20"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBrand(brand.id);
                    }}
                    className="text-red-300 hover:text-white hover:bg-red-600/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
              <CardDescription className="text-blue-200">
                {brand.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  {brand.primaryColors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {brand.personality.slice(0, 3).map((trait, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-blue-600/20 text-blue-200 rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-blue-300">
                  Criada em {new Date(brand.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
