import React, { useState, useEffect } from 'react';
import { Plus, X, UserPlus, UserMinus, Eye, EyeOff, Star, Edit2, Check, XCircle, MessageSquare } from 'lucide-react';
import { Link } from '../types';
import useLinks from '../hooks/useLinks';
import useSuggestions from '../hooks/useSuggestions';
import useWebsiteOfDay from '../hooks/useWebsiteOfDay';
import useAdminMessage from '../hooks/useAdminMessage';

function AdminView() {
  const { links, addLink, removeLink, updateLinkColor, toggleAccountRequirement, updateLink, updateLinkOrder } = useLinks();
  const { suggestions, removeSuggestion, addSuggestionToLinks } = useSuggestions();
  const { websiteOfDay, setManualWebsiteOfDay } = useWebsiteOfDay(links);
  const { adminMessage, updateMessage } = useAdminMessage();
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#2563eb');
  const [requiresAccount, setRequiresAccount] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Link>>({});
  const [confirmationDialog, setConfirmationDialog] = useState<{
    show: boolean;
    linkId: string;
  } | null>(null);
  const [messageConfirmation, setMessageConfirmation] = useState<{
    show: boolean;
    pendingMessage: { text: string; color: string; isVisible: boolean };
  } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      sessionStorage.setItem('adminAuthenticated', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  // Check login status on component mount
  useEffect(() => {
    const isAdminAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(isAdminAuthenticated);
  }, []);

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newName) return;

    const formattedUrl = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
    addLink({ 
      url: formattedUrl, 
      name: newName, 
      color: newColor,
      requiresAccount 
    });
    setNewUrl('');
    setNewName('');
    setNewColor('#2563eb');
    setRequiresAccount(false);
  };

  const startEditing = (link: Link) => {
    setEditingLink(link.id);
    setEditValues({
      name: link.name,
      url: link.url,
      color: link.color,
      requiresAccount: link.requiresAccount,
      order: link.order
    });
  };

  const cancelEditing = () => {
    setEditingLink(null);
    setEditValues({});
  };

  const saveEditing = (id: string) => {
    if (!editValues.name || !editValues.url) return;

    const formattedUrl = editValues.url.startsWith('http') 
      ? editValues.url 
      : `https://${editValues.url}`;

    updateLink(id, {
      name: editValues.name,
      url: formattedUrl,
      color: editValues.color || '#2563eb',
      requiresAccount: editValues.requiresAccount || false,
      order: editValues.order || 1
    });

    if (editValues.order) {
      updateLinkOrder(id, editValues.order);
    }
    
    setEditingLink(null);
    setEditValues({});
  };

  const handleWebsiteOfDayChange = (linkId: string) => {
    setConfirmationDialog({ show: true, linkId });
  };

  const handleConfirmation = (confirmed: boolean) => {
    if (confirmed && confirmationDialog) {
      setManualWebsiteOfDay(confirmationDialog.linkId);
    }
    setConfirmationDialog(null);
  };

  const handleMessageVisibilityChange = (isVisible: boolean) => {
    if (isVisible && adminMessage.text) {
      setMessageConfirmation({
        show: true,
        pendingMessage: {
          text: adminMessage.text,
          color: adminMessage.color,
          isVisible: true
        }
      });
    } else {
      updateMessage({ isVisible: false });
    }
  };

  const handleMessageConfirmation = (confirmed: boolean) => {
    if (confirmed && messageConfirmation) {
      updateMessage(messageConfirmation.pendingMessage);
    }
    setMessageConfirmation(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <div className="text-center mb-6">
          <p className="text-lg font-medium text-red-600 bg-red-100 p-4 rounded-lg shadow-sm">
            Hey! If you're not Emma don't try to login, I know who you are *glare*
          </p>
        </div>
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Dashboard</h1>

      {/* Admin Message Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Admin Message</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col gap-4">
            <textarea
              value={adminMessage.text}
              onChange={(e) => updateMessage({ text: e.target.value })}
              placeholder="Enter a message to display on the website..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md h-32 resize-none"
            />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Color:</label>
                <input
                  type="color"
                  value={adminMessage.color}
                  onChange={(e) => updateMessage({ color: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={adminMessage.isVisible}
                  onChange={(e) => handleMessageVisibilityChange(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                Show Message
              </label>
            </div>
            {adminMessage.isVisible && adminMessage.text && (
              <div className="mt-2 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
                <p style={{ color: adminMessage.color }}>{adminMessage.text}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Website of the Day</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...links].sort((a, b) => a.order - b.order).map((link) => (
              <button
                key={link.id}
                onClick={() => handleWebsiteOfDayChange(link.id)}
                className={`p-4 rounded-lg text-white text-center relative transition-transform hover:-translate-y-1 ${
                  websiteOfDay?.linkId === link.id ? 'ring-4 ring-yellow-400' : ''
                }`}
                style={{ backgroundColor: link.color }}
              >
                {websiteOfDay?.linkId === link.id && (
                  <Star className="absolute top-2 right-2" size={20} />
                )}
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add New Link</h2>
        <form onSubmit={handleAddLink} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Enter website URL"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter website name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-20 h-11 px-1 py-1 border border-gray-300 rounded-md cursor-pointer"
              title="Choose link color"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={requiresAccount}
                onChange={(e) => setRequiresAccount(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              Requires Account
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add Link
            </button>
          </div>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Current Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...links].sort((a, b) => a.order - b.order).map((link) => (
            <div
              key={link.id}
              className="bg-white p-4 rounded-lg shadow-md relative group"
              style={{ backgroundColor: editingLink === link.id ? 'white' : link.color }}
            >
              {editingLink === link.id ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="number"
                      value={editValues.order || link.order}
                      onChange={(e) => setEditValues({ ...editValues, order: Math.max(1, parseInt(e.target.value)) })}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-gray-800"
                      min="1"
                      max={links.length}
                    />
                    <span className="text-sm text-gray-500">Order</span>
                  </div>
                  <input
                    type="text"
                    value={editValues.name || ''}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    placeholder="Website name"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-gray-800"
                  />
                  <input
                    type="text"
                    value={editValues.url || ''}
                    onChange={(e) => setEditValues({ ...editValues, url: e.target.value })}
                    placeholder="Website URL"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-gray-800"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editValues.color || link.color}
                      onChange={(e) => setEditValues({ ...editValues, color: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <label className="flex items-center gap-1 text-gray-700 text-sm">
                      <input
                        type="checkbox"
                        checked={editValues.requiresAccount}
                        onChange={(e) => setEditValues({ ...editValues, requiresAccount: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      Account
                    </label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => saveEditing(link.id)}
                      className="text-green-600 hover:text-green-700"
                      title="Save changes"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-red-600 hover:text-red-700"
                      title="Cancel editing"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute top-2 left-2 bg-white bg-opacity-75 rounded px-2 py-1 text-sm font-medium">
                    {link.order}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEditing(link)}
                      className="text-white hover:text-gray-200 transition-colors"
                      title="Edit link"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => toggleAccountRequirement(link.id)}
                      className="text-white hover:text-gray-200 transition-colors"
                      title={link.requiresAccount ? "Remove account requirement" : "Add account requirement"}
                    >
                      {link.requiresAccount ? <UserMinus size={20} /> : <UserPlus size={20} />}
                    </button>
                    <input
                      type="color"
                      value={link.color}
                      onChange={(e) => updateLinkColor(link.id, e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer"
                      title="Change color"
                    />
                    <button
                      onClick={() => removeLink(link.id)}
                      className="text-white hover:text-red-300"
                      title="Remove link"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center font-medium text-white"
                  >
                    {link.name}
                    {link.requiresAccount && (
                      <UserPlus size={16} className="inline ml-2" />
                    )}
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Suggested Links</h2>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <p className="font-medium">{suggestion.name}</p>
                <p className="text-gray-600">{suggestion.url}</p>
                <p className="text-sm text-gray-500">From: {suggestion.submitterName}</p>
                <p className="text-sm text-gray-600 mt-2">{suggestion.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => addSuggestionToLinks(suggestion)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  onClick={() => removeSuggestion(suggestion.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmationDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-center mb-4">
                are you sure you wanna change me :( ???
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleConfirmation(true)}
                  className="w-full py-3 text-blue-600 font-semibold text-lg hover:bg-blue-50 rounded-lg transition-colors"
                >
                  yes, GIMMIE MY MONEY
                </button>
                <div className="w-full h-px bg-gray-200"></div>
                <button
                  onClick={() => handleConfirmation(false)}
                  className="w-full py-3 text-red-600 font-semibold text-lg hover:bg-red-50 rounded-lg transition-colors"
                >
                  No, I wasn't paying attention...
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Confirmation Dialog */}
      {messageConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-center mb-4">
                Ready to share your message with the world?
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleMessageConfirmation(true)}
                  className="w-full py-3 text-blue-600 font-semibold text-lg hover:bg-blue-50 rounded-lg transition-colors"
                >
                  SEND IT TO THE TROOPS!!
                </button>
                <div className="w-full h-px bg-gray-200"></div>
                <button
                  onClick={() => handleMessageConfirmation(false)}
                  className="w-full py-3 text-red-600 font-semibold text-lg hover:bg-red-50 rounded-lg transition-colors"
                >
                  Ummmm... Lemme rethink that
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminView;