import { useState, useEffect } from 'react';
import { Link } from '../types';

const DEFAULT_COLOR = '#2563eb';

export default function useLinks() {
  const [links, setLinks] = useState<Link[]>(() => {
    const saved = localStorage.getItem('links');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  const addLink = ({ 
    url, 
    name, 
    color = DEFAULT_COLOR,
    requiresAccount = false 
  }: { 
    url: string; 
    name: string; 
    color?: string;
    requiresAccount?: boolean;
  }) => {
    const maxOrder = Math.max(0, ...links.map(link => link.order));
    const newLink: Link = {
      id: Date.now().toString(),
      url,
      name,
      color,
      requiresAccount,
      order: maxOrder + 1
    };
    setLinks([...links, newLink]);
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const updateLinkColor = (id: string, color: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, color } : link
    ));
  };

  const toggleAccountRequirement = (id: string) => {
    setLinks(links.map(link =>
      link.id === id ? { ...link, requiresAccount: !link.requiresAccount } : link
    ));
  };

  const updateLink = (id: string, updates: Partial<Link>) => {
    setLinks(links.map(link =>
      link.id === id ? { ...link, ...updates } : link
    ));
  };

  const updateLinkOrder = (id: string, newOrder: number) => {
    const oldLink = links.find(link => link.id === id);
    if (!oldLink) return;

    const clampedOrder = Math.max(1, Math.min(newOrder, links.length));
    
    setLinks(links.map(link => {
      if (link.id === id) {
        return { ...link, order: clampedOrder };
      }
      return link;
    }));
  };

  return { 
    links, 
    loading,
    error,
    addLink, 
    removeLink, 
    updateLinkColor, 
    toggleAccountRequirement,
    updateLink,
    updateLinkOrder
  };
}