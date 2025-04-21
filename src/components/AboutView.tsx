import React from 'react';
import { Flower } from 'lucide-react';

function AboutView() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md relative">
        {/* Top-left flower */}
        <div className="absolute -top-3 -left-3 text-[#FF1493] transform -rotate-45">
          <Flower size={24} />
        </div>
        
        {/* Top-right flower */}
        <div className="absolute -top-3 -right-3 text-[#FF1493] transform rotate-45">
          <Flower size={24} />
        </div>
        
        {/* Bottom-left flower */}
        <div className="absolute -bottom-3 -left-3 text-[#FF1493] transform -rotate-135">
          <Flower size={24} />
        </div>
        
        {/* Bottom-right flower */}
        <div className="absolute -bottom-3 -right-3 text-[#FF1493] transform rotate-135">
          <Flower size={24} />
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">READ ME!!!</h1>
        <div className="prose max-w-none space-y-6">
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

export default AboutView;