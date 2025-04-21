import React, { useState } from 'react';

function SideTab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-0 top-1/3 z-50 flex items-start">
      {/* Tab button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1a472a] text-white px-2 py-8 rounded-l-lg writing-mode-vertical transform rotate-180 hover:bg-[#0f2c1a] transition-colors"
        style={{ writingMode: 'vertical-rl' }}
      >
        READ ME!!!
      </button>

      {/* Slide-out panel */}
      <div 
        className={`bg-white shadow-lg w-80 p-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="prose">
          <p className="text-lg leading-relaxed text-gray-800">
            HI! My names Emma, and I wanted to make a website where all the boredom cures I could think of were all in one place.
          </p>
          <p className="text-lg leading-relaxed text-gray-800">
            Each "button" is a different link that you can access, with a fun and interesting website to go to.
          </p>
          <p className="text-lg leading-relaxed text-gray-800">
            There are NO descriptions of the websites, because I want you to be surprised.
          </p>
          <p className="text-lg leading-relaxed text-gray-800">
            There will be a website of the day though, which is the coolest, awesomest, bestest, website of THAT day...
          </p>
          <p className="text-lg leading-relaxed text-gray-800">
            If there are any websites you think of that could be cooler (not possible), click on the suggest tab at the top right to send them my way.
          </p>
          <p className="text-lg leading-relaxed text-gray-800 font-bold">
            So, enjoy this, it's made to be fun, and DON'T do anything stupid.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideTab;