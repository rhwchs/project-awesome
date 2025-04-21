import React, { useState } from 'react';
import { UserPlus, Star } from 'lucide-react';
import useLinks from '../hooks/useLinks';
import useWebsiteOfDay from '../hooks/useWebsiteOfDay';
import Firework from './Firework';
import SideTab from './SideTab';

function PublicView() {
  const { links } = useLinks();
  const { getWebsiteOfDay } = useWebsiteOfDay(links);
  const websiteOfDay = getWebsiteOfDay();
  const [firework, setFirework] = useState<{
    show: boolean;
    x: number;
    y: number;
    color: string;
    url: string;
    isWebsiteOfDay: boolean;
  } | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { url: string; color: string; id: string }) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setFirework({
      show: true,
      x,
      y,
      color: link.color,
      url: link.url,
      isWebsiteOfDay: link.id === websiteOfDay?.id
    });
  };

  const darkenColor = (color: string) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    
    const darkenAmount = 0.2;
    const darkerR = Math.floor(r * (1 - darkenAmount));
    const darkerG = Math.floor(g * (1 - darkenAmount));
    const darkerB = Math.floor(b * (1 - darkenAmount));
    
    return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
  };

  // Generate star positions
  const generateStarPositions = () => {
    const positions = [];
    positions.push({ top: '10%', left: '20%', delay: '0s' });
    positions.push({ top: '15%', left: '80%', delay: '0.1s' });
    positions.push({ top: '25%', left: '40%', delay: '0.2s' });
    positions.push({ top: '35%', left: '70%', delay: '0.3s' });
    positions.push({ top: '45%', left: '15%', delay: '0.4s' });
    positions.push({ top: '55%', left: '85%', delay: '0.5s' });
    positions.push({ top: '65%', left: '30%', delay: '0.6s' });
    positions.push({ top: '75%', left: '60%', delay: '0.7s' });
    positions.push({ top: '85%', left: '45%', delay: '0.8s' });
    positions.push({ top: '20%', left: '55%', delay: '0.9s' });
    positions.push({ top: '40%', left: '90%', delay: '1s' });
    positions.push({ top: '70%', left: '10%', delay: '1.1s' });
    return positions;
  };

  // Reorder links to put website of the day first
  const orderedLinks = [...links].sort((a, b) => {
    if (a.id === websiteOfDay?.id) return -1;
    if (b.id === websiteOfDay?.id) return 1;
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto relative pb-8">
      <SideTab />
      
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Awesome Links Archive</h1>
      
      {websiteOfDay && (
        <div 
          className="mb-8 p-3 rounded-lg text-white text-center font-bold text-xl flex items-center justify-center gap-2"
          style={{ backgroundColor: websiteOfDay.color }}
        >
          <Star size={24} className="animate-pulse" />
          TODAYS WEBSITE OF THE DAY IS: {websiteOfDay.name}
          <Star size={24} className="animate-pulse" />
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {orderedLinks.map((link) => {
          const borderColor = darkenColor(link.color);
          return (
            <a
              key={link.id}
              href={link.url}
              onClick={(e) => handleLinkClick(e, link)}
              target="_blank"
              rel="noopener noreferrer"
              className={`block h-32 rounded-lg shadow-md transition-transform hover:-translate-y-1 relative group overflow-hidden ${
                link.id === websiteOfDay?.id ? 'shadow-lg ring-2 ring-yellow-400' : ''
              }`}
              style={{ 
                backgroundColor: link.color,
                border: `2px solid ${borderColor}`,
                boxShadow: link.id === websiteOfDay?.id ? `0 0 20px ${link.color}40` : undefined
              }}
            >
              <div className="h-full flex items-center justify-center p-4 relative">
                {link.id === websiteOfDay?.id && (
                  <>
                    {generateStarPositions().map((pos, index) => (
                      <Star 
                        key={index}
                        size={16} 
                        className="absolute animate-pulse text-white"
                        style={{
                          top: pos.top,
                          left: pos.left,
                          animationDelay: pos.delay,
                          opacity: 0.8
                        }}
                      />
                    ))}
                  </>
                )}
                <span className="text-center font-medium text-white break-words text-xl z-10">
                  {link.name}
                  {link.requiresAccount && (
                    <UserPlus size={16} className="inline ml-2" />
                  )}
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {firework && firework.show && (
        <Firework
          color={firework.color}
          x={firework.x}
          y={firework.y}
          onComplete={() => {
            window.open(firework.url, '_blank');
            setFirework(null);
          }}
        />
      )}

      {/* Flower border container */}
      <div 
        style={{ 
          position: 'relative',
          width: '100%',
          height: '50px',
          overflow: 'hidden'
        }}
      >
        <img 
          src="/flowers.png"
          alt="Decorative flowers"
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: 0,
            width: '100%',
            objectFit: 'cover',
            opacity: 0.6
          }}
        />
      </div>
    </div>
  );
}

export default PublicView;