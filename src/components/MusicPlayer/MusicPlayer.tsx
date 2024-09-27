import React, { useState } from 'react';
import SearchForm from './SearchForm';
import CurrentSong from './CurrentSong';
import axios from 'axios';
import { useCopilotAction } from '@copilotkit/react-core';

const MusicPlayer: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [videos, setVideos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleSearch = async (searchQuery: string) => {
    try {
      const response = await axios.get(`/api/youtube?query=${encodeURIComponent(searchQuery)}`);
      const resultItems = response.data.items;

      if (!resultItems.length) {
        setError('No videos found for this query.');
        return;
      }

      const fetchedVideos = resultItems.map((item: any) => ({
        title: item.snippet.title,
        videoId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

      setVideos(fetchedVideos);
      setCurrentVideoIndex(0);
      setError(null);
    } catch (err) {
      setError('Failed to fetch videos.');
    }
  };

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const currentVideo = videos[currentVideoIndex];

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Copilot action to play a song
  useCopilotAction({
    name: 'playSong',
    description: 'Plays a song based on the search query',
    parameters: [
      {
        name: 'query',
        type: 'string',
        description: 'The title of the song to play',
        required: true,
      },
    ],
    handler: async ({ query }) => {
      await handleSearch(query);
      setIsPlaying(true);
    },
    render: ({ status, args }) => (
      <div className="flex flex-col items-center justify-center">
        {status === 'complete' && currentVideo ? (
          <div className="text-center">
            <p className="font-bold">Now playing:</p>
            <p className="text-lg">{currentVideo.title}</p>
          </div>
        ) : (
          <p>Searching for "{args.query}"...</p>
        )}
      </div>
    ),
  });

  // Copilot action to pause/play a song
  useCopilotAction({
    name: 'togglePlayPause',
    description: 'Toggles between play and pause',
    handler: () => {
      togglePlayPause();
    },
    render: ({ status }) => (
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold">{isPlaying ? 'Currently Playing' : 'Currently Paused'}</p>
      </div>
    ),
  });

  // Copilot action to queue a song by adding it to the playlist
  useCopilotAction({
    name: 'queueSong',
    description: 'Queues a song to the playlist',
    parameters: [
      {
        name: 'query',
        type: 'string',
        description: 'The title of the song to queue',
        required: true,
      },
    ],
    handler: async ({ query }) => {
      try {
        const response = await axios.get(`/api/youtube?query=${encodeURIComponent(query)}`);
        const resultItems = response.data.items;

        if (!resultItems.length) {
          setError('No videos found for this query.');
          return;
        }

        const queuedVideo = resultItems[0]; // Pick the first result for simplicity
        const newVideo = {
          title: queuedVideo.snippet.title,
          videoId: queuedVideo.id.videoId,
          thumbnail: queuedVideo.snippet.thumbnails.medium.url,
        };

        setVideos((prevVideos) => [...prevVideos, newVideo]); // Add the new video to the queue
      } catch (err) {
        setError('Failed to queue the song.');
      }
    },
    render: ({ status, args }) => (
      <div className="flex flex-col items-center justify-center">
        {status === 'complete' ? (
          <p className="font-bold">Queued song: {args.query}</p>
        ) : (
          <p>Queuing "{args.query}"...</p>
        )}
      </div>
    ),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400 p-10">
      <h1 className="text-6xl font-extrabold text-black uppercase mb-8 border-8 border-black p-4 bg-red-500">
        PLAY THE BEAT
      </h1>

      <SearchForm onSearch={handleSearch} />

      {error && <p className="text-red-600 text-xl font-bold mb-4">{error}</p>}

      {currentVideo && (
        <CurrentSong
          video={currentVideo}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
        />
      )}
    </div>
  );
};

export default MusicPlayer;
