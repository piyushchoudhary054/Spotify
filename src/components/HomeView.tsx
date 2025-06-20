import React from 'react';
import { Clock, Play } from 'lucide-react';
import { Track, Album, Playlist } from '../types';

interface HomeViewProps {
  recentTracks: Track[];
  featuredAlbums: Album[];
  recentPlaylists: Playlist[];
  onTrackPlay: (track: Track, tracks: Track[], index: number) => void;
  onAlbumSelect: (album: Album) => void;
  onPlaylistSelect: (playlist: Playlist) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  recentTracks,
  featuredAlbums,
  recentPlaylists,
  onTrackPlay,
  onAlbumSelect,
  onPlaylistSelect
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="p-6 space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">{getGreeting()}</h1>
        
        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {recentPlaylists.slice(0, 6).map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => onPlaylistSelect(playlist)}
              className="flex items-center bg-gray-800/40 hover:bg-gray-700/60 rounded-lg p-2 transition-colors group"
            >
              <img
                src={playlist.coverUrl}
                alt={playlist.name}
                className="w-16 h-16 rounded object-cover"
              />
              <span className="ml-4 font-semibold text-white truncate">{playlist.name}</span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-5 h-5 text-black" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recently Played */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Recently played</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recentTracks.slice(0, 5).map((track, index) => (
            <div
              key={track.id}
              className="bg-gray-800/40 hover:bg-gray-700/60 rounded-lg p-4 transition-all hover:scale-105 cursor-pointer group"
              onClick={() => onTrackPlay(track, recentTracks, index)}
            >
              <div className="relative mb-4">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-full aspect-square rounded-lg object-cover"
                />
                <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  <Play className="w-5 h-5 text-black" />
                </button>
              </div>
              <h3 className="font-semibold text-white mb-1 truncate">{track.title}</h3>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Albums */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Popular albums</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredAlbums.map((album) => (
            <div
              key={album.id}
              className="bg-gray-800/40 hover:bg-gray-700/60 rounded-lg p-4 transition-all hover:scale-105 cursor-pointer group"
              onClick={() => onAlbumSelect(album)}
            >
              <div className="relative mb-4">
                <img
                  src={album.coverUrl}
                  alt={album.title}
                  className="w-full aspect-square rounded-lg object-cover"
                />
                <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  <Play className="w-5 h-5 text-black" />
                </button>
              </div>
              <h3 className="font-semibold text-white mb-1 truncate">{album.title}</h3>
              <p className="text-sm text-gray-400 truncate">{album.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Made for You */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Made for you</h2>
          <button className="text-gray-400 hover:text-white text-sm font-medium">Show all</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recentPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-800/40 hover:bg-gray-700/60 rounded-lg p-4 transition-all hover:scale-105 cursor-pointer group"
              onClick={() => onPlaylistSelect(playlist)}
            >
              <div className="relative mb-4">
                <img
                  src={playlist.coverUrl}
                  alt={playlist.name}
                  className="w-full aspect-square rounded-lg object-cover"
                />
                <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  <Play className="w-5 h-5 text-black" />
                </button>
              </div>
              <h3 className="font-semibold text-white mb-1 truncate">{playlist.name}</h3>
              <p className="text-sm text-gray-400 truncate">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};