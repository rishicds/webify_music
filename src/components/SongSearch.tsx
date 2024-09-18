import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Release {
  title: string;
  artist: string;
  label: string;
  year: string;
  [key: string]: any;
}

const SongSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [releases, setReleases] = useState<Release[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // MusicBrainz API endpoint for search
      const url = `https://musicbrainz.org/ws/2/release?query=${encodeURIComponent(query)}&fmt=json`;
      
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json'
        }
      });

      setReleases(response.data.releases.map((result: any) => ({
        title: result.title,
        artist: result.artists.map((artist: any) => artist.name).join(', '),
        label: result.labels.map((label: any) => label.name).join(', '),
        year: result.date ? result.date.split('-')[0] : 'N/A',
      })));
    } catch (err) {
      setError('Failed to fetch releases.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Release Search</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a release"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-red-600 border border-red-700 rounded-md text-white hover:bg-red-700"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {releases.map((release, index) => (
          <li key={index} className="mb-4 p-4 bg-gray-800 border border-gray-700 rounded-md">
            <h2 className="text-xl font-semibold">{release.title}</h2>
            <p className="text-gray-400">Artist: {release.artist}</p>
            <p className="text-gray-400">Label: {release.label}</p>
            <p className="text-gray-400">Year: {release.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongSearch;
