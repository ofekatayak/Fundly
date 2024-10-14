// src/components/SearchBar.tsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar__input"
      />
      <div className="search-bar__icon">
        <FaSearch size={20} />
      </div>
    </div>
  );
};

export default SearchBar;
