
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Brand } from '@/types/brand';
import { toast } from 'sonner';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching brands:', error);
        toast.error('Erro ao carregar marcas');
        return;
      }

      // Transform database data to Brand type with proper type casting
      const transformedBrands: Brand[] = (data || []).map(brand => ({
        id: brand.id,
        name: brand.name || '',
        description: brand.description || '',
        createdAt: brand.created_at?.split('T')[0] || '',
        personality: brand.personality || [],
        toneOfVoice: brand.tone_of_voice || '',
        targetAudience: brand.target_audience || '',
        primaryColors: brand.primary_colors || ['#0b1c3b'],
        secondaryColors: brand.secondary_colors || ['#66ccff'],
        typography: (brand.typography as { title: string; body: string; accent: string }) || { title: '', body: '', accent: '' },
        atmosphere: (brand.atmosphere as { scents: string[]; environments: string[]; playlists: string[]; references: string[] }) || { scents: [], environments: [], playlists: [], references: [] },
        logos: (brand.logos as { primary: string; horizontal: string; favicon: string }) || { primary: '', horizontal: '', favicon: '' },
        brandImage: brand.brand_image,
        brandStory: brand.brand_story,
        timeline: (brand.timeline as Array<{ year: string; event: string }>) || [],
        publicObjections: brand.public_objections || [],
        desires: (brand.desires as { internal: string[]; external: string[] }) || { internal: [], external: [] },
        fears: brand.fears || [],
        archetype: (brand.archetype as { name: string; description: string; example: string }) || { name: '', description: '', example: '' },
        brandPromise: brand.brand_promise,
        coreValues: brand.core_values || [],
        slogans: (brand.slogans as { main: string; secondary: string[] }) || { main: '', secondary: [] }
      }));

      setBrands(transformedBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Erro ao carregar marcas');
    } finally {
      setLoading(false);
    }
  };

  const createBrand = async (brandData: Partial<Brand>) => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .insert([{
          // Removendo user_id temporariamente
          name: brandData.name || '',
          description: brandData.description || '',
          personality: brandData.personality || [],
          tone_of_voice: brandData.toneOfVoice || '',
          target_audience: brandData.targetAudience || '',
          primary_colors: brandData.primaryColors || ['#0b1c3b'],
          secondary_colors: brandData.secondaryColors || ['#66ccff'],
          typography: brandData.typography || { title: '', body: '', accent: '' },
          atmosphere: brandData.atmosphere || { scents: [], environments: [], playlists: [], references: [] },
          logos: brandData.logos || { primary: '', horizontal: '', favicon: '' },
          brand_image: brandData.brandImage,
          brand_story: brandData.brandStory,
          timeline: brandData.timeline || [],
          public_objections: brandData.publicObjections || [],
          desires: brandData.desires || { internal: [], external: [] },
          fears: brandData.fears || [],
          archetype: brandData.archetype || { name: '', description: '', example: '' },
          brand_promise: brandData.brandPromise,
          core_values: brandData.coreValues || [],
          slogans: brandData.slogans || { main: '', secondary: [] }
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating brand:', error);
        toast.error('Erro ao criar marca');
        return;
      }

      toast.success('Marca criada com sucesso!');
      await fetchBrands();
    } catch (error) {
      console.error('Error creating brand:', error);
      toast.error('Erro ao criar marca');
    }
  };

  const updateBrand = async (brandId: string, brandData: Partial<Brand>) => {
    try {
      const { error } = await supabase
        .from('brands')
        .update({
          name: brandData.name,
          description: brandData.description,
          personality: brandData.personality,
          tone_of_voice: brandData.toneOfVoice,
          target_audience: brandData.targetAudience,
          primary_colors: brandData.primaryColors,
          secondary_colors: brandData.secondaryColors,
          typography: brandData.typography,
          atmosphere: brandData.atmosphere,
          logos: brandData.logos,
          brand_image: brandData.brandImage,
          brand_story: brandData.brandStory,
          timeline: brandData.timeline,
          public_objections: brandData.publicObjections,
          desires: brandData.desires,
          fears: brandData.fears,
          archetype: brandData.archetype,
          brand_promise: brandData.brandPromise,
          core_values: brandData.coreValues,
          slogans: brandData.slogans
        })
        .eq('id', brandId);

      if (error) {
        console.error('Error updating brand:', error);
        toast.error('Erro ao atualizar marca');
        return;
      }

      toast.success('Marca atualizada com sucesso!');
      await fetchBrands();
    } catch (error) {
      console.error('Error updating brand:', error);
      toast.error('Erro ao atualizar marca');
    }
  };

  const deleteBrand = async (brandId: string) => {
    try {
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', brandId);

      if (error) {
        console.error('Error deleting brand:', error);
        toast.error('Erro ao deletar marca');
        return;
      }

      toast.success('Marca deletada com sucesso!');
      await fetchBrands();
    } catch (error) {
      console.error('Error deleting brand:', error);
      toast.error('Erro ao deletar marca');
    }
  };

  return {
    brands,
    loading,
    createBrand,
    updateBrand,
    deleteBrand,
    refetch: fetchBrands
  };
}
