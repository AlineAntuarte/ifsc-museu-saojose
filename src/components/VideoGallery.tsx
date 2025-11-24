'use client';

import { useAdmin } from '@/contexts/AdminContext';
import { Image as ImageIcon, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

interface Video {
  id: number;
  ordem: number;
  titulo: string;
  video: string;
  thumbnail: string;
  tipo: string;
}

export default function GallerySection() {
  const [items, setItems] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingItem, setEditingItem] = useState<Video | null>(null);
  const { isAdmin, token } = useAdmin();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const videosResponse = await fetch('/api/videos');
        if (!videosResponse.ok) {
          throw new Error('Falha ao buscar vídeos');
        }

        const videosData = await videosResponse.json();

        setItems(videosData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = () => {
    setEditingItem(null);
    setShowEditor(true);
  };

  // const handleEditItem = async (item: Video) => {
  //   try {
  //     const [itemResponse, mediasResponse] = await Promise.all([
  //       fetch(`/api/acervo/${item.id}`),
  //       fetch(`/api/acervo/${item.id}/midias`),
  //     ]);

  //     if (itemResponse.ok) {
  //       const itemCompleto = await itemResponse.json();
  //       let midias: Media[] = [];

  //       if (mediasResponse.ok) {
  //         midias = await mediasResponse.json();
  //       }

  //       setEditingItem({ ...itemCompleto, midias });
  //       setShowEditor(true);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao buscar item para edição:', error);
  //   }
  // };

  // const handleDeleteItem = async (item: Item) => {
  //   if (!token) return;

  //   const confirmDelete = window.confirm(
  //     `Tem certeza que deseja deletar "${item.text}"?`,
  //   );

  //   if (!confirmDelete) return;

  //   try {
  //     const response = await fetch(`/api/acervo/${item.id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       setItems(items.filter((i) => i.id !== item.id));
  //     } else {
  //       const errorData = await response.json();
  //       alert(`Erro ao deletar: ${errorData.error}`);
  //     }
  //   } catch (error) {
  //     console.error('Erro ao deletar item:', error);
  //     alert('Erro ao deletar item');
  //   }
  // };

  // const handleSaveItem = (savedItem: AcervoItem) => {
  //   // Recarregar a galeria após salvar
  //   window.location.reload();
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Carregando videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">Erro: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Galeria de Vídeos
          </h1>
        </div>
        {isAdmin && (
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded"
          >
            <Plus size={20} />
            Adicionar Vídeo
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum vídeo no acervo
              </h3>
              <p className="text-gray-600 mb-4">Adicione vídeos</p>
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
                >
                  <Plus size={16} />
                  Adicionar Primeiro Vídeo
                </button>
              )}
            </div>
          </div>
        ) : (
          items.map((item) => {
            return (
              <div
                key={item.id}
                style={{ position: 'relative', paddingTop: '177.78%' }}
              >
                <ReactPlayer
                  src={item.video}
                  width="100%"
                  height="100%"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  controls
                  key={item.id}
                />
              </div>
            );
          })
        )}
      </div>

      {/* {showEditor && (
        <ItemEditor
          item={editingItem || { id: 0, titulo: '' }}
          type="acervo"
          onClose={() => {
            setShowEditor(false);
            setEditingItem(null);
          }}
          onSave={handleSaveItem}
        />
      )} */}
    </div>
  );
}
