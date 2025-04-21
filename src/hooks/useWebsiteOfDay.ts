import { useState, useEffect } from 'react';
import { Link, WebsiteOfDay } from '../types';

export default function useWebsiteOfDay(links: Link[]) {
  const [websiteOfDay, setWebsiteOfDay] = useState<WebsiteOfDay>(() => {
    const saved = localStorage.getItem('websiteOfDay');
    return saved ? JSON.parse(saved) : null;
  });

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!websiteOfDay || websiteOfDay.date !== today) {
      if (links.length > 0) {
        const randomIndex = Math.floor(Math.random() * links.length);
        setWebsiteOfDay({
          linkId: links[randomIndex].id,
          date: today,
          isManualOverride: false
        });
      }
    }
  }, [links, today]);

  useEffect(() => {
    if (websiteOfDay) {
      localStorage.setItem('websiteOfDay', JSON.stringify(websiteOfDay));
    }
  }, [websiteOfDay]);

  const setManualWebsiteOfDay = (linkId: string) => {
    setWebsiteOfDay({
      linkId,
      date: today,
      isManualOverride: true
    });
  };

  const getWebsiteOfDay = () => {
    return links.find(link => link.id === websiteOfDay?.linkId);
  };

  return { websiteOfDay, setManualWebsiteOfDay, getWebsiteOfDay };
}