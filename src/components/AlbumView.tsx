import React from 'react';
import { Play, Pause, MoreHorizontal, Clock, Heart } from 'lucide-react';
import { Album, Track } from '../types';
import { TrackList } from './TrackList';

interface AlbumViewProps {
  album: Album;
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackPlay: (track: Track, tracks: Track[], index: number) => void;
  onTogglePlayPause: () => void;
}

export const AlbumView: React.FC<AlbumViewProps> = ({
  album,
  currentTrack,
  isPlaying,
  onTrackPlay,
  onTogglePlayPause
}) => {
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${mins} min`;
    }
    return `${mins} min`;
  };

  const formatYear = (dateString: string): string => {
    return new Date(dateString).getFullYear().toString();
  };

  const isAlbumPlaying = album.tracks.some(track => track.id === currentTrack?.id) && isPlaying;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-end gap-6 p-6 bg-gradient-to-b from-blue-800/60 to-gray-900/20">
        <img
          src={album.coverUrl}
          alt={album.title}
          className="w-60 h-60 rounded-lg shadow-2xl object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-white mb-2">ALBUM</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{album.title}</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-white">{album.artist}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{formatYear(album.releaseDate)}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{album.tracks.length} songs,</span>
            <span className="text-gray-400">{formatDuration(album.totalDuration)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 px-6 py-6 bg-gradient-to-b from-black/40 to-transparent">
        <button
          onClick={() => {
            if (isAlbumPlaying) {
              onTogglePlayPause();
            } else {
              onTrackPlay(album.tracks[0], album.tracks, 0);
            }
          }}
          className="w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all"
        >
          {isAlbumPlaying ? (
            <Pause className="w-6 h-6 text-black" />
          ) : (
            <Play className="w-6 h-6 text-black ml-1" />
          )}
        </button>

        <button className="text-gray-400 hover:text-white transition-colors">
          <Heart className="w-8 h-8" />
        </button>

        <button className="text-gray-400 hover:text-white transition-colors">
          <MoreHorizontal className="w-8 h-8" />
        </button>
      </div>

      {/* Track List */}
      <TrackList
        tracks={album.tracks}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTrackPlay={onTrackPlay}
        onTogglePlayPause={onTogglePlayPause}
        showAlbum={false}
      />
    </div>
  );
};