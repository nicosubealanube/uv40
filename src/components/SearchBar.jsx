import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { getSuggestions } from '../api/api';

const SearchBar = ({ onSearch, onUseLocation, loading }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length >= 3) {
                const results = await getSuggestions(query);
                setSuggestions(results);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.display_name.split(',')[0]);
        onSearch(suggestion.display_name); // Or pass lat/lon directly if supported by App
        setShowSuggestions(false);
    };

    const clearSearch = () => {
        setQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
    }

    return (
        <div ref={wrapperRef} className="w-full max-w-md mx-auto mb-8 px-4 relative z-50">
            <form onSubmit={handleSubmit} className="relative flex items-center mb-3">
                <Search className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 3 && setShowSuggestions(true)}
                    placeholder="Search city (e.g., Buenos Aires)..."
                    className="w-full pl-11 pr-12 py-4 rounded-2xl border-none bg-white shadow-lg shadow-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700 placeholder-gray-400 text-lg transition-all"
                />
                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-12 text-gray-400 hover:text-gray-600 p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-3 bg-black text-white p-2 rounded-xl hover:bg-gray-800 disabled:opacity-50 transition-colors"
                >
                    <Search className="w-4 h-4" />
                </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-[3.8rem] left-4 right-4 bg-white rounded-xl shadow-xl shadow-gray-200 border border-gray-100 overflow-hidden max-h-60 overflow-y-auto">
                    {suggestions.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleSuggestionClick(item)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm border-b border-gray-50 last:border-none transition-colors flex items-center gap-2"
                        >
                            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{item.display_name}</span>
                        </button>
                    ))}
                </div>
            )}

            <button
                onClick={onUseLocation}
                disabled={loading}
                className="flex items-center justify-center w-full py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors gap-2 font-medium"
            >
                <MapPin className="w-4 h-4" />
                Use my location
            </button>
        </div>
    );
};

export default SearchBar;
