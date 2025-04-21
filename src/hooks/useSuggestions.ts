import { useState, useEffect } from 'react';
import { Suggestion } from '../types';
import useLinks from './useLinks';

export default function useSuggestions() {
  const { addLink } = useLinks();
  const [suggestions, setSuggestions] = useState<Suggestion[]>(() => {
    const saved = localStorage.getItem('suggestions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
  }, [suggestions]);

  const addSuggestion = ({ url, name, submitterName, description }: { 
    url: string; 
    name: string; 
    submitterName: string;
    description: string;
  }) => {
    const newSuggestion: Suggestion = {
      id: Date.now().toString(),
      url,
      name,
      submitterName,
      description,
    };
    setSuggestions([...suggestions, newSuggestion]);
  };

  const removeSuggestion = (id: string) => {
    setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
  };

  const addSuggestionToLinks = (suggestion: Suggestion) => {
    addLink({ url: suggestion.url, name: suggestion.name });
    removeSuggestion(suggestion.id);
  };

  return { suggestions, addSuggestion, removeSuggestion, addSuggestionToLinks };
}