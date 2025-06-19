
-- Criar tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  PRIMARY KEY (id)
);

-- Criar tabela de marcas
CREATE TABLE public.brands (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  
  -- Branding básico
  personality TEXT[] DEFAULT '{}',
  tone_of_voice TEXT,
  target_audience TEXT,
  
  -- Identidade visual
  primary_colors TEXT[] DEFAULT '{}',
  secondary_colors TEXT[] DEFAULT '{}',
  typography JSONB DEFAULT '{"title": "", "body": "", "accent": ""}',
  
  -- Atmosfera
  atmosphere JSONB DEFAULT '{"scents": [], "environments": [], "playlists": [], "references": []}',
  
  -- Logos e imagens
  logos JSONB DEFAULT '{"primary": "", "horizontal": "", "favicon": ""}',
  brand_image TEXT,
  
  -- Seções avançadas
  brand_story TEXT,
  timeline JSONB DEFAULT '[]',
  public_objections TEXT[] DEFAULT '{}',
  desires JSONB DEFAULT '{"internal": [], "external": []}',
  fears TEXT[] DEFAULT '{}',
  archetype JSONB DEFAULT '{"name": "", "description": "", "example": ""}',
  brand_promise TEXT,
  core_values TEXT[] DEFAULT '{}',
  slogans JSONB DEFAULT '{"main": "", "secondary": []}',
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Usuários podem ver seu próprio perfil" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir seu próprio perfil" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Políticas RLS para brands
CREATE POLICY "Usuários podem ver suas próprias marcas" 
  ON public.brands 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias marcas" 
  ON public.brands 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias marcas" 
  ON public.brands 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias marcas" 
  ON public.brands 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Trigger para criar perfil automaticamente quando um usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id, 
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  RETURN new;
END;
$$;

-- Trigger que executa a função quando um novo usuário é criado
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers para atualizar updated_at
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_brands_updated_at
  BEFORE UPDATE ON public.brands
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
