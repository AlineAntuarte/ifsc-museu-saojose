'use client';

import { FileText, Save, Edit3 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VideoItem {
  id: string;
  video: string;
  descricao?: string;
}

interface VideoEditorProps {
  item: Partial<VideoItem> | null;
  onClose: () => void;
  onSave: (item: VideoItem) => void;
}

export default function VideoEditor({
  item,
  onClose,
  onSave,
}: VideoEditorProps) {

  const [formData, setFormData] = useState({
    video: '',
    descricao: '',
  });


  const isNewItem = !item || !item.id;
  const title = isNewItem ? 'Adicionar Novo Vídeo' : 'Editar Vídeo';

  useEffect(() => {
    if (item) {
      setFormData({
        video: item.video || '',
        descricao: item.descricao || '',
      });
    } else {
      setFormData({ video: '', descricao: '' });
    }
  }, [item]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      id: item?.id || new Date().toISOString(),
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="bg-card border-b border-border px-8 py-6">
            <h2 className="text-3xl font-bold text-card-foreground flex items-center gap-3">
              <Edit3 size={28} className="text-muted-foreground" />
              {title}
            </h2>
          </div>

          <div className="overflow-y-auto max-h-[calc(95vh-200px)] p-8 space-y-8">
            <div className="bg-card border border-border rounded p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={20} className="text-muted-foreground" />
                <label
                  htmlFor="video"
                  className="text-base font-semibold text-card-foreground"
                >
                  Link do Vídeo
                </label>
                <span className="text-destructive text-sm">*</span>
              </div>
              <input
                type="text"
                id="video"
                name="video"
                value={formData.video}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 text-card-foreground bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-lg"
                placeholder="Cole o link do TikTok, YouTube, etc."
              />
            </div>

            <div className="bg-card border border-border rounded p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={20} className="text-muted-foreground" />
                <label
                  htmlFor="descricao"
                  className="text-base font-semibold text-card-foreground"
                >
                  Descrição (Opcional)
                </label>
              </div>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-4 text-card-foreground bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none"
                placeholder="Uma breve descrição sobre o vídeo..."
              />
            </div>
          </div>

          <div className="bg-muted/30 border-t border-border px-8 py-6">
            <div className="flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-border text-muted-foreground transition-all font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!formData.video.trim()}
                className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-sm"
              >
                <Save size={18} />
                Salvar Vídeo
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}