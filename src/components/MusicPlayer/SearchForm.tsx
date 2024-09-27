import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
      setInputValue(''); // Clear the input after search
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search for a song..."
        className="border-4 border-black rounded-none p-3 text-xl font-bold bg-white text-red-500 focus:outline-none focus:ring-4 focus:ring-red-500 transition-all duration-200"
        required
      />
      <button 
        type="submit" 
        className="ml-2 px-4 py-3 bg-red-500 border-4 border-black text-white text-xl font-bold rounded-none hover:bg-red-600 transition-all duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
