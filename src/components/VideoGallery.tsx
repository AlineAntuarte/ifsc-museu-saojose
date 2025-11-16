'use client';
import ReactPlayer from 'react-player';

export default function VideoGallery() {
  const videos = [
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
      {videos.map((video) => (
        <div
          key={video.id}
          style={{ width: '100%', maxWidth: '325px', margin: '0 auto' }}
        >
          <div style={{ position: 'relative', paddingTop: '177.78%' }}>
            <ReactPlayer
              src={video.video}
              controls
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
