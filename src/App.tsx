import React from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink, Navigate } from 'react-router-dom';
import AdminView from './components/AdminView';
import PublicView from './components/PublicView';
import SuggestLink from './components/SuggestLink';
import AboutView from './components/AboutView';
import DateTime from './components/DateTime';
import { Lock, Home, Send, Flower } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <nav className="bg-white shadow-md p-4">
          <div className="max-w-4xl mx-auto">
            <DateTime />
            <div className="flex justify-between items-center mt-2">
              <RouterLink to="/AwesomeLinksArchive" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Home size={24} />
                Links Archive
              </RouterLink>
              <div className="flex gap-4">
                <RouterLink
                  to="/about"
                  className="flex items-center gap-2 text-lg text-[#FF1493] hover:text-[#FF69B4] transition-colors"
                >
                  <Flower size={20} />
                  READ ME!!!
                </RouterLink>
                <RouterLink
                  to="/suggest"
                  className="flex items-center gap-2 text-lg text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Send size={20} />
                  Suggest
                </RouterLink>
                <RouterLink
                  to="/admin"
                  className="flex items-center gap-2 text-lg text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Lock size={20} />
                  Admin
                </RouterLink>
              </div>
            </div>
          </div>
        </nav>

        <div className="p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/AwesomeLinksArchive" replace />} />
            <Route path="/AwesomeLinksArchive" element={<PublicView />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/suggest" element={<SuggestLink />} />
            <Route path="/about" element={<AboutView />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;