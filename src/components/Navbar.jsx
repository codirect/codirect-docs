import { Globe, SearchIcon, SparkleIcon, SparklesIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import searchIndex from '../data/searchIndex.json';

export default function Navbar({ onOpenAiOverlay }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (value.trim() === '') {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowerQuery = value.toLowerCase();
    const filtered = searchIndex.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.content.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
    setIsOpen(true);
  };

  const handleSelect = (path) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if ((e.key === 'Enter' || e.key === ' ') && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex].path);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="logo-co">co</span><span className="logo-direct">DIRECT</span>
        </Link>
      </div>

      <div className='search-container'>
        <div className="navbar-search" ref={searchRef}>
          <Search size={18} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (query) setIsOpen(true); }}
          />
          <div className="search-shortcut">
            <kbd>Ctrl</kbd> <kbd>K</kbd>
          </div>
          {isOpen && (
            <div className="search-dropdown">
              {results.length > 0 ? (
                results.map((res, index) => (
                  <div
                    key={res.id}
                    className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => handleSelect(res.path)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <h4>{res.title}</h4>
                    <p>{res.content.substring(0, 60)}...</p>
                  </div>
                ))
              ) : (
                <div className="search-result-empty">No results found for "{query}"</div>
              )}
            </div>
          )}
        </div>

        <button className='ai-button' onClick={onOpenAiOverlay}>Assistant <SparklesIcon size={17}/></button>
      </div>

      <div className="navbar-right">
        <div className="navbar-icons">
          <a href="#" aria-label="GitHub" className="icon-link"><FaGithub size={20} /></a>
          <a href="#" aria-label="Discord" className="icon-link"><FaDiscord size={20} /></a>
          <a href="#" aria-label="Main Website" className="icon-link"><Globe size={20} /></a>
        </div>
      </div>
    </nav>
  );
}
