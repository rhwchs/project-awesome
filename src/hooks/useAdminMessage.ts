import { useState, useEffect } from 'react';
import { AdminMessage } from '../types';

export default function useAdminMessage() {
  const [adminMessage, setAdminMessage] = useState<AdminMessage>(() => {
    const saved = localStorage.getItem('adminMessage');
    return saved ? JSON.parse(saved) : {
      text: '',
      color: '#000000',
      isVisible: false
    };
  });

  useEffect(() => {
    localStorage.setItem('adminMessage', JSON.stringify(adminMessage));
  }, [adminMessage]);

  const updateMessage = (message: Partial<AdminMessage>) => {
    setAdminMessage(prev => ({ ...prev, ...message }));
  };

  return { adminMessage, updateMessage };
}