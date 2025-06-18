
import { useState } from "react";
import { Upload, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  maxSize?: number; // in MB
  maxDimensions?: { width: number; height: number };
  label: string;
  description?: string;
}

export function ImageUpload({ 
  value, 
  onChange, 
  maxSize = 2, 
  maxDimensions = { width: 500, height: 500 },
  label,
  description 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Arquivo muito grande. Tamanho máximo: ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    setIsUploading(true);

    // Create image to validate dimensions
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        if (img.width > maxDimensions.width || img.height > maxDimensions.height) {
          alert(`Dimensões muito grandes. Máximo: ${maxDimensions.width}x${maxDimensions.height}px`);
          setIsUploading(false);
          return;
        }

        // For now, we'll use the data URL. In a real app, you'd upload to Supabase Storage
        const dataUrl = e.target?.result as string;
        setPreview(dataUrl);
        onChange(dataUrl);
        setIsUploading(false);
      };
      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-cyan-200 font-medium block mb-2">{label}</label>
        {description && (
          <p className="text-slate-400 text-sm mb-3">{description}</p>
        )}
      </div>

      {preview ? (
        <div className="relative inline-block">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-xl border-2 border-cyan-400/30"
          />
          <Button
            size="sm"
            variant="destructive"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-cyan-400/30 rounded-xl p-8 text-center hover:border-cyan-400/50 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id={`upload-${label.replace(/\s+/g, '-')}`}
            disabled={isUploading}
          />
          <label 
            htmlFor={`upload-${label.replace(/\s+/g, '-')}`}
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            {isUploading ? (
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Image className="w-8 h-8 text-cyan-400" />
            )}
            <div>
              <p className="text-sm text-slate-300 font-medium">
                {isUploading ? 'Carregando...' : 'Clique para fazer upload'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Máximo: {maxDimensions.width}x{maxDimensions.height}px, {maxSize}MB
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
