'use client';

import { useState } from 'react';
import ReactPlayer from 'react-player';
import { useAdmin } from '@/contexts/AdminContext';
import { Plus, Trash2, Edit } from 'lucide-react';
import VideoEditor from './VideoEditor';

interface VideoItem {
  id: string;
  video: string;
  descricao?: string;
}
const initialVideos: VideoItem[] = [
  {
    video:
      'https://www.tiktok.com/@conexo.cultural/video/7473169845186530565?_r=1&_t=8lc9MZDFngU',
    id: '7473169845186530565',
  },
  {
    video:
      'https://www.tiktok.com/@conexo.cultural/video/7468072826981928198?_r=1&_t=8lc9MZDFngU',
    id: '7468072826981928198',
  },
  {
    video:
      'https://www.tiktok.com/@conexo.cultural/video/7466982716718730502?_r=1&_t=8lc9MZDFngU',
    id: '7466982716718730502',
  },
  {
    video:
      'https://www.tiktok.com/@conexo.cultural/video/7435311742814620983?_r=1&_t=8lc9MZDFngU',
    id: '7435311742814620983',
  },
  {
    video:
      'https://www.tiktok.com/@conexo.cultural/photo/7408304019745148166?_r=1&_t=8lc9MZDFngU',
    id: '7408304019745148166',
  },
  {
    video:
      'https://www.tiktok.com/@conexo.cultural/video/7408280273139322117?_r=1&_t=8lc9MZDFngU',
    id: '7408280273139322117',
  },
  {
    video:
      'https://www.tiktok.com/@conexo.cultural/video/7408278749197700357?_r=1&_t=8lc9MZDFngU',
    id: '7408278749197700357',
  },
  {
    video:
      'https://www.tiktok.com/@conexo.cultural/photo/7400058666986114310?_r=1&_t=8lc9MZDFngU',
    id: '7400058666986114310',
  },
  {
    video:
      'https://www.tiktok.com/@conexo.cultural/video/7397575845075766533?_r=1&_t=8lc9MZDFngU',
    id: '7397575845075766533',
  },
  {
    video:
      'https://www.tiktok.com/@conexo.cultural/video/7395724890755648773?_r=1&_t=8lc9MZDFngU',
    id: '7395724890755648773',
  },
  {
    video:
      'https://www.tiktok.com/@conexo.cultural/video/7387535726897876230?_r=1&_t=8lc9MZDFngU',
    id: '7387535726897876230',
  },
];

export default function VideoGallery() {
  const { isAdmin, token } = useAdmin();
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [showEditor, setShowEditor] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const handleOpenAddModal = () => {
    setEditingVideo(null);
    setShowEditor(true);
  };

  const handleOpenEditModal = (video: VideoItem) => {
    setEditingVideo(video);
    setShowEditor(true);
  };

  const handleCloseModal = () => {
    setShowEditor(false);
    setEditingVideo(null);
  };

  const handleSaveVideo = (videoToSave: VideoItem) => {
    if (editingVideo) {
      setVideos((prevVideos) =>
        prevVideos.map((v) =>
          v.id === editingVideo.id ? { ...v, ...videoToSave } : v,
        ),
      );
    } else {
      setVideos((prevVideos) => [videoToSave, ...prevVideos]);
    }
    handleCloseModal(); 
  };

  const handleDeleteVideo = (id: string) => {
    if (!isAdmin) return;
    if (window.confirm('Tem certeza que deseja deletar este vídeo?')) {
      setVideos((prevVideos) => prevVideos.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Galeria de Vídeos
          </h1>
          <p className="text-gray-600">
            Explore os vídeos do Museu Histórico de São José
          </p>
        </div>
        {isAdmin && (
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded"
          >
            <Plus size={20} />
            Adicionar Vídeo
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
        {videos.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Nenhum vídeo adicionado ainda.
          </p>
        )}

        {videos.map((video) => {
          const isPhotoLink = video.video.includes('/photo/');

          return (
            <div
              key={video.id}
              className="relative group"
              style={{ width: '100%', maxWidth: '325px', margin: '0 auto' }}
            >
              <div style={{ position: 'relative', paddingTop: '177.78%' }}>
                {isPhotoLink ? (
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center p-4">
                    <p className="text-center text-red-600 text-sm">
                      Este link é uma foto do TikTok e não pode ser exibido como
                      vídeo.
                    </p>
                  </div>
                ) : (
                  <ReactPlayer
                    src={video.video}
                    controls
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    onError={() => console.error(`Erro ao carregar: ${video.video}`)}
                  />
                )}
              </div>

              {isAdmin && (
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditModal(video);
                    }}
                    className="p-2 bg-blue-600 text-white rounded-full shadow-lg"
                    title="Editar vídeo"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteVideo(video.id);
                    }}
                    className="p-2 bg-red-600 text-white rounded-full shadow-lg"
                    title="Deletar vídeo"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showEditor && (
        <VideoEditor
          item={editingVideo}
          onClose={handleCloseModal}
          onSave={handleSaveVideo}
        />
      )}
    </div>
  );
}