import { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  // List of built-in songs
  const songs = [
    {
      title: 'Song 1',
      artist: 'Artist 1',
      url: '/songs/song1.mp3',
    },
    {
      title: 'Song 2',
      artist: 'Artist 2',
      url: '/songs/song2.mp3',
    },
    {
      title: 'Song 3',
      artist: 'Artist 3',
      url: '/songs/song3.mp3',
    },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track current song index
  const [signupRequired, setSignupRequired] = useState(false); // Track if sign up is required
  const [progress, setProgress] = useState(0); // Custom progress bar state
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      return () => audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-10">
      <div className="music-player w-full md:w-2/3 lg:w-1/2 bg-white p-8 rounded-md shadow-2xl border-8 border-black relative">
        {!signupRequired ? (
          <>
            <div className="song-info text-center mb-6">
              <h3 className="text-3xl font-bold text-black bg-yellow-300 inline-block px-4 py-2 border-4 border-black">
                {songs[currentSongIndex].title}
              </h3>
              <p className="text-xl text-black mt-2 bg-cyan-200 inline-block px-4 py-2 border-4 border-black">
                {songs[currentSongIndex].artist}
              </p>
            </div>

            {/* Custom progress bar */}
            <div className="w-full h-6 bg-gray-300 rounded-full border-4 border-black mb-6">
              <div
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Custom audio controls */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={playPreviousSong}
                className="bg-blue-500 text-white py-2 px-4 border-4 border-black shadow-lg transform active:scale-95 hover:bg-blue-600"
              >
                Previous
              </button>
              <button
                onClick={playNextSong}
                className="bg-green-500 text-white py-2 px-4 border-4 border-black shadow-lg transform active:scale-95 hover:bg-green-600"
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
            <h3 className="text-4xl font-bold text-red-600 bg-yellow-400 px-6 py-4 border-4 border-black inline-block">
              Sign up to listen to more music!
            </h3>
            <button className="signup-button mt-8 text-2xl bg-blue-500 text-white py-3 px-6 border-4 border-black shadow-lg transform active:scale-95 hover:bg-blue-600">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
