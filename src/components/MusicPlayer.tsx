import { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  // List of built-in songs with image URLs
  const songs = [
    {
      title: 'One of the Girls',
      artist: 'WEEKND',
      url: 'songs/song1.mp3',
      imageUrl: 'song1.png', // Add image URL here
    },
    {
      title: 'Attention',
      artist: 'Charlie Puth',
      url: 'songs/song2.ogg',
      imageUrl: 'song2.png', // Add image URL here
    },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track current song index
  const [signupRequired, setSignupRequired] = useState(false); // Track if sign up is required
  const [progress, setProgress] = useState(0); // Custom progress bar state
  const [isPlaying, setIsPlaying] = useState(true); // Track play/pause state
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle song end
  const handleSongEnd = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setProgress(0); // Reset progress bar
    } else {
      setSignupRequired(true); // After three songs, ask for signup
    }
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  // Play the previous song
  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setProgress(0);
    }
  };

  // Play the next song
  const playNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setProgress(0);
    } else {
      setSignupRequired(true);
    }
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      return () => audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-10">
    <h2 className="text-6xl pb-12 font-extrabold text-left text-black uppercase">
    HAVE A TASTE</h2>
      <div className="music-player w-full md:w-2/3 lg:w-1/2 bg-white p-8 rounded-md shadow-2xl border-8 border-black relative">
        {!signupRequired ? (
          <>
            <div className="song-info text-center mb-8">
              <img
                src={songs[currentSongIndex].imageUrl}
                alt={songs[currentSongIndex].title}
                className="w-64 h-64 object-cover mx-auto mb-6 border-4 border-black"
              />
              <h3 className="text-4xl font-bold text-black bg-yellow-300 inline-block px-6 py-3 border-4 border-black">
                {songs[currentSongIndex].title}
              </h3>
              <p className="text-2xl text-black mt-4 bg-cyan-200 inline-block px-6 py-3 border-4 border-black">
                {songs[currentSongIndex].artist}
              </p>
            </div>

            {/* Custom progress bar */}
            <div className="w-full h-8 bg-gray-300 rounded-full border-4 border-black mb-6">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Custom audio controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={playPreviousSong}
                className="bg-blue-500 text-white py-3 px-6 text-lg border-4 border-black shadow-lg transform active:scale-95 hover:bg-blue-600"
              >
                Previous
              </button>
              <button
                onClick={togglePlayPause}
                className={`bg-yellow-500 text-white py-3 px-6 text-lg border-4 border-black shadow-lg transform active:scale-95 hover:bg-yellow-600 ${
                  isPlaying ? 'bg-yellow-500' : 'bg-gray-500'
                }`}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={playNextSong}
                className="bg-green-500 text-white py-3 px-6 text-lg border-4 border-black shadow-lg transform active:scale-95 hover:bg-green-600"
              >
                Next
              </button>
            </div>

            {/* Hidden audio element */}
            <audio
              ref={audioRef}
              autoPlay
              onEnded={handleSongEnd}
              className="hidden" // Hiding the default audio controls
              src={songs[currentSongIndex].url}
            />
          </>
        ) : (
          <div className="signup-prompt text-center">
            <h3 className="text-5xl font-bold text-red-600 bg-yellow-400 px-8 py-6 border-4 border-black inline-block">
              Sign up to listen to more music!
            </h3>
            <button className="signup-button mt-8 text-3xl bg-blue-500 text-white py-4 px-8 border-4 border-black shadow-lg transform active:scale-95 hover:bg-blue-600">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
