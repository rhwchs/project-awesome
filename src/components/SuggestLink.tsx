import React, { useState } from 'react';
import useSuggestions from '../hooks/useSuggestions';
import RainbowFirework from './RainbowFirework';

function SuggestLink() {
  const { addSuggestion } = useSuggestions();
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [firework, setFirework] = useState<{ show: boolean; x: number; y: number } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !name || !submitterName || !description) return;

    // Get button position for firework
    const button = e.currentTarget.querySelector('button');
    if (button) {
      const rect = button.getBoundingClientRect();
      setFirework({
        show: true,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }

    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    addSuggestion({ url: formattedUrl, name, submitterName, description });
  };

  const handleFireworkComplete = () => {
    setFirework(null);
    setUrl('');
    setName('');
    setSubmitterName('');
    setDescription('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md border-4 border-green-800">
          <h2 className="text-2xl font-bold mb-4 text-green-800">Thank You!</h2>
          <p className="text-gray-600 mb-4">Your suggestion has been submitted for review.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition-colors"
          >
            Suggest Another Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Suggest a Link</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border-4 border-green-800">
        <div className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <input
              id="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Website Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter website name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="submitterName" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              id="submitterName"
              type="text"
              value={submitterName}
              onChange={(e) => setSubmitterName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe this website"
              className="w-full px-4 py-2 border border-gray-300 rounded-md h-24 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition-colors"
          >
            Submit Suggestion
          </button>
        </div>
      </form>

      {firework && firework.show && (
        <RainbowFirework
          x={firework.x}
          y={firework.y}
          onComplete={handleFireworkComplete}
        />
      )}
    </div>
  );
}

export default SuggestLink;