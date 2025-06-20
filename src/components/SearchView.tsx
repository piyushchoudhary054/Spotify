import React from 'react';
import { Play } from 'lucide-react';
import { Track, Album, Artist } from '../types';
import { featuredGenres } from '../data/mockData';

interface SearchViewProps {
  searchQuery: string;
  searchResults: {
    tracks: Track[];
    albums: Album[];
    artists: Artist[];
  };
  onTrackPlay: (track: Track, tracks: Track[], index: number) => void;
  onAlbumSelect: (album: Album) => void;
  onArtistSelect: (artist: Artist) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  searchQuery,
  searchResults,
  onTrackPlay,
  onAlbumSelect,
  onArtistSelect
}) => {
  if (!searchQuery) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Browse all</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredGenres.map((genre) => (
            <div
              key={genre.name}
              className={`${genre.color} rounded-lg p-6 h-32 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
            >
              <h3 className="text-white text-xl font-bold">{genre.name}</h3>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-black/20 rounded-lg transform rotate-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const hasResults = searchResults.tracks.length > 0 || searchResults.albums.length > 0 || searchResults.artists.length > 0;

  if (!hasResults) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-white mb-4">No results found for "{searchQuery}"</h2>
          <p className="text-gray-400">Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Top Result */}
      {searchResults.tracks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Top result</h2>
          <div className="bg-gray-800/40 hover:bg-gray-700/60 rounded-lg p-6 max-w-md cursor-pointer group transition-colors">
            <img
              src={searchResults.tracks[0].coverUrl}
              alt={searchResults.tracks[0].title}
              className="w-24 h-24 rounded-lg object-cover mb-4"
            />
            <h3 className="text-2xl font-bold text-white mb-1">{searchResults.tracks[0].title}</h3>
            <p className="text-gray-400 mb-4">Song • {searchResults.tracks[0].artist}</p>
            <button
              onClick={() => onTrackPlay(searchResults.tracks[0], searchResults.tracks, 0)}
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg"
            >
              <Play className="w-6 h-6 text-black" />
            </button>
          </div>
        </section>
      )}

      {/* Songs */}
      {searchResults.tracks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
          <div className="space-y-2">
            {searchResults.tracks.slice(0, 4).map((track, index) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-800/40 cursor-pointer group transition-colors"
                onClick={() => onTrackPlay(track, searchResults.tracks, index)}
              >
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{track.title}</p>
                  <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                </div>
                <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 text-black" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Artists */}
      {searchResults.artists.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {searchResults.artists.map((artist) => (
              <div
                key={artist.id}
                className="bg-gray-800/40 hover:bg-gray-700/60 rounded-lg p-4 cursor-pointer group transition-all hover:scale-105"
                onClick={() => onArtistSelect(artist)}
              >
                <div className="relative mb-4">
                  <img
                    src={artist.imageUrl}
                    alt={artist.name}
                    className="w-full aspect-square rounded-full object-cover"
                  />
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <Play className="w-5 h-5 text-black" />
                  </button>
                </div>
                <h3 className="font-semibold text-white mb-1 truncate text-center">{artist.name}</h3>
                <p className="text-sm text-gray-400 text-center">Artist</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Albums */}
      {searchResults.albums.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {searchResults.albums.map((album) => (
              <div
                key={album.id}
                className="bg-gray-800/40 hover:bg-gray-700/60 rounded-lg p-4 cursor-pointer group transition-all hover:scale-105"
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
      )}
    </div>
  );
};