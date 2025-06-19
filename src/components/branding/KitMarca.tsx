import { useState } from "react";
import { Plus, Edit, Trash2, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandForm } from "./BrandForm";
import { BrandView } from "./BrandView";
import { Brand } from "@/types/brand";
import { useBrands } from "@/hooks/useBrands";

export function KitMarca() {
  const { brands, loading, createBrand, updateBrand, deleteBrand } = useBrands();
  const [isCreating, setIsCreating] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [viewingBrand, setViewingBrand] = useState<Brand | null>(null);

  const handleCreateBrand = async (brandData: Partial<Brand>) => {
    await createBrand(brandData);
    setIsCreating(false);
  };

  const handleEditBrand = async (brandData: Partial<Brand>) => {
    if (editingBrand) {
      await updateBrand(editingBrand.id, brandData);
      setEditingBrand(null);
    }
  };

  const handleDeleteBrand = async (brandId: string) => {
    if (confirm('Tem certeza que deseja deletar esta marca?')) {
      await deleteBrand(brandId);
    }
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

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="text-center py-16">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl text-slate-400">Carregando suas marcas...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-4 glow">
            <Star className="w-10 h-10 text-cyan-400 icon-glow" fill="currentColor" />
            Kit de Marca
          </h1>
          <p className="text-cyan-300 mt-3 text-lg">
            Gerencie a identidade cósmica das suas marcas com elegância estelar
          </p>
        </div>
        <div className="flex gap-4">
          <Button 
            onClick={() => setIsCreating(true)}
            className="sirius-button px-8 py-4 text-lg"
          >
            <Plus className="w-5 h-5 mr-3" />
            Nova Marca
          </Button>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card 
            key={brand.id} 
            className="sirius-card hover:bg-slate-800/50 cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
            onClick={() => setViewingBrand(brand)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-xl glow">
                  {brand.name}
                </CardTitle>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingBrand(brand);
                    }}
                    className="text-cyan-300 hover:text-white hover:bg-cyan-500/20 p-2"
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
                    className="text-red-300 hover:text-white hover:bg-red-500/20 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                {brand.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Brand Image Preview */}
              {brand.brandImage && (
                <div className="flex justify-center">
                  <img 
                    src={brand.brandImage} 
                    alt={brand.name}
                    className="w-16 h-16 object-cover rounded-lg border-2 border-cyan-400/30"
                  />
                </div>
              )}

              {/* Color Palette */}
              <div className="flex gap-2">
                {brand.primaryColors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-lg"
                    style={{ backgroundColor: color }}
                  />
                ))}
                {brand.primaryColors.length > 4 && (
                  <div className="w-8 h-8 rounded-lg border-2 border-white/20 bg-slate-700 flex items-center justify-center text-xs text-cyan-300">
                    +{brand.primaryColors.length - 4}
                  </div>
                )}
              </div>

              {/* Personality Traits */}
              <div className="flex flex-wrap gap-2">
                {brand.personality.slice(0, 3).map((trait, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full font-medium"
                  >
                    {trait}
                  </span>
                ))}
                {brand.personality.length > 3 && (
                  <span className="text-xs px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full font-medium">
                    +{brand.personality.length - 3}
                  </span>
                )}
              </div>

              {/* Archetype */}
              {brand.archetype?.name && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20">
                  <Crown className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-200 text-sm font-medium">{brand.archetype.name}</span>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-cyan-400/20">
                <p className="text-xs text-cyan-300">
                  Criada em {new Date(brand.createdAt).toLocaleDateString('pt-BR')}
                </p>
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {brands.length === 0 && (
        <div className="text-center py-16">
          <Star className="w-16 h-16 text-cyan-400/30 mx-auto mb-6" />
          <h3 className="text-xl text-slate-400 mb-2">Nenhuma marca cadastrada</h3>
          <p className="text-slate-500 mb-6">Crie sua primeira marca para começar a organizar sua identidade visual</p>
          <Button onClick={() => setIsCreating(true)} className="sirius-button">
            <Plus className="w-4 h-4 mr-2" />
            Criar primeira marca
          </Button>
        </div>
      )}
    </div>
  );
}
