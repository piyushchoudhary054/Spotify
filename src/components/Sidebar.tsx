import React from 'react';
import { Home, Search, Library, Plus, Heart, Music, Users } from 'lucide-react';
import { Playlist } from '../types';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  playlists: Playlist[];
  onPlaylistSelect: (playlist: Playlist) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  playlists,
  onPlaylistSelect
}) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'library', icon: Library, label: 'Your Library' }
  ];

  return (
    <div className="w-64 bg-black text-white h-full flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Music className="w-8 h-8 text-green-500" />
          <span className="text-xl font-bold">Spotify 2.0</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-6 mb-8">
        <ul className="space-y-2">
          {navItems.map(({ id, icon: Icon, label }) => (
            <li key={id}>
              <button
                onClick={() => onViewChange(id)}
                className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === id
                    ? 'bg-green-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Create Playlist */}
      <div className="px-6 mb-4">
        <button className="flex items-center gap-4 text-gray-300 hover:text-white text-sm font-medium">
          <div className="w-6 h-6 bg-gray-600 rounded-sm flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </div>
          Create Playlist
        </button>
      </div>

      {/* Liked Songs */}
      <div className="px-6 mb-6">
        <button className="flex items-center gap-4 text-gray-300 hover:text-white text-sm font-medium">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-700 to-blue-300 rounded-sm flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          Liked Songs
        </button>
      </div>

      {/* Playlists */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="space-y-2">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => onPlaylistSelect(playlist)}
              className="w-full text-left text-sm text-gray-300 hover:text-white py-1 truncate"
            >
              {playlist.name}
            </button>
          ))}
        </div>
      </div>

      {/* Install App */}
      <div className="p-6 border-t border-gray-800">
        <button className="flex items-center gap-4 text-gray-300 hover:text-white text-sm font-medium">
          <Users className="w-5 h-5" />
          Install App
        </button>
      </div>
    </div>
  );
};