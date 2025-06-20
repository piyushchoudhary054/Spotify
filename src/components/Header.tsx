import React from 'react';
import { Search, ChevronLeft, ChevronRight, User } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentView: string;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onBack?: () => void;
  onForward?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  currentView,
  canGoBack = false,
  canGoForward = false,
  onBack,
  onForward
}) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent sticky top-0 z-10">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            disabled={!canGoBack}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              canGoBack
                ? 'bg-black/70 text-white hover:bg-black/90'
                : 'bg-black/30 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onForward}
            disabled={!canGoForward}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              canGoForward
                ? 'bg-black/70 text-white hover:bg-black/90'
                : 'bg-black/30 text-gray-500 cursor-not-allowed'
            } transition-colors`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        {currentView === 'search' && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-96 pl-10 pr-4 py-2 bg-white text-black rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        <button className="bg-black/70 hover:bg-black/90 text-white px-4 py-1 rounded-full text-sm font-medium transition-colors">
          Upgrade
        </button>
        <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
          <User className="w-4 h-4 text-white" />
        </button>
      </div>
    </header>
  );
};