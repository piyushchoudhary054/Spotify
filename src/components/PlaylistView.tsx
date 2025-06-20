import React from 'react';
import { Play, Pause, MoreHorizontal, Clock, Heart } from 'lucide-react';
import { Playlist, Track } from '../types';
import { TrackList } from './TrackList';

interface PlaylistViewProps {
  playlist: Playlist;
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackPlay: (track: Track, tracks: Track[], index: number) => void;
  onTogglePlayPause: () => void;
}

export const PlaylistView: React.FC<PlaylistViewProps> = ({
  playlist,
  currentTrack,
  isPlaying,
  onTrackPlay,
  onTogglePlayPause
}) => {
  const totalDuration = playlist.tracks.reduce((acc, track) => acc + track.duration, 0);
  const formatTotalDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours} hr ${mins} min`;
    }
    return `${mins} min`;
  };

  const isPlaylistPlaying = playlist.tracks.some(track => track.id === currentTrack?.id) && isPlaying;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-end gap-6 p-6 bg-gradient-to-b from-purple-800/60 to-gray-900/20">
        <img
          src={playlist.coverUrl}
          alt={playlist.name}
          className="w-60 h-60 rounded-lg shadow-2xl object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-white mb-2">PUBLIC PLAYLIST</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{playlist.name}</h1>
          <p className="text-gray-300 mb-4">{playlist.description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="font-semibold text-white">Spotify</span>
            <span>•</span>
            <span>{playlist.tracks.length} songs,</span>
            <span className="text-gray-400">{formatTotalDuration(totalDuration)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 px-6 py-6 bg-gradient-to-b from-black/40 to-transparent">
        <button
          onClick={() => {
            if (isPlaylistPlaying) {
              onTogglePlayPause();
            } else {
              onTrackPlay(playlist.tracks[0], playlist.tracks, 0);
            }
          }}
          className="w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all"
        >
          {isPlaylistPlaying ? (
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
        tracks={playlist.tracks}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTrackPlay={onTrackPlay}
        onTogglePlayPause={onTogglePlayPause}
      />
    </div>
  );
};