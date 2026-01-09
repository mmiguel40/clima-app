import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
    onSearch: (city: string) => void;
    onClear: () => void;
    isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSearch(input.trim());
        }
    };

    const handleClear = () => {
        setInput('');
        onClear();
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Buscar ciudad (ej: Santiago)"
                disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? '...' : 'Buscar'}
            </button>
            <button type="button" onClick={handleClear} className="clear-btn" disabled={isLoading}>
                Limpiar
            </button>
        </form>
    );
};

export default SearchBar;
