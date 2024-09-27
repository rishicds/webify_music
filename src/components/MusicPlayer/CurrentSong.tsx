import React, { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface CurrentSongProps {
  video: {
    title: string;
    thumbnail: string;
    videoId: string;
  };
  onNext: () => void;
  onPrevious: () => void;
  isPlaying: boolean;
  togglePlayPause: () => void;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const CurrentSong: React.FC<CurrentSongProps> = ({ video, onNext, onPrevious, isPlaying, togglePlayPause }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null); // Reference for the YouTube player instance

  useEffect(() => {
    // Load the YouTube IFrame Player API code asynchronously
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Create YouTube player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      playerInstanceRef.current = new window.YT.Player(playerRef.current, {
        height: '0',
        width: '0',
        videoId: video.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
        },
        events: {
          onReady: (event: any) => {
            if (isPlaying) {
              event.target.playVideo();
            }
          },
        },
      });
    };

    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
      }
    };
  }, []); // Only run this effect once on mount

  // Update the video when the videoId or isPlaying state changes
  useEffect(() => {
    if (playerInstanceRef.current) {
      playerInstanceRef.current.loadVideoById(video.videoId);
      if (isPlaying) {
        playerInstanceRef.current.playVideo();
      } else {
        playerInstanceRef.current.pauseVideo();
      }
    }
  }, [video.videoId, isPlaying]);

  // Handle play/pause by interacting with YouTube player API
  const handleTogglePlayPause = () => {
    if (playerInstanceRef.current) {
      if (isPlaying) {
        playerInstanceRef.current.pauseVideo();
      } else {
        playerInstanceRef.current.playVideo();
      }
    }
    togglePlayPause(); // Toggle local state after interacting with YouTube API
  };

  return (
    <div className="w-full max-w-2xl bg-green-200 p-8 rounded-none shadow-[12px_12px_0_0_rgba(0,0,0,1)] border-8 border-black">
      <h2 className="text-4xl font-black text-black mb-6 tracking-tight">{video.title}</h2>

      <div className="relative w-full mb-6">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-64 object-cover border-8 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
        />
        <button
          onClick={handleTogglePlayPause} // Call handleTogglePlayPause
          className="absolute bottom-4 right-4 bg-red-300 p-4 rounded-full border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>

      <div ref={playerRef} /> {/* Hidden YouTube player */}

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          className="px-6 py-3 bg-pink-500 border-4 border-black rounded-none text-white text-xl font-black hover:shadow-none hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center"
        >
          <SkipBack size={24} className="mr-2" /> Previous
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-500 border-4 border-black rounded-none text-white text-xl font-black hover:shadow-none hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all flex items-center"
        >
          Next <SkipForward size={24} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CurrentSong;
