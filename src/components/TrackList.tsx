import React from 'react';
import { Play, Pause, Clock, MoreHorizontal, Heart } from 'lucide-react';
import { Track } from '../types';

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackPlay: (track: Track, tracks: Track[], index: number) => void;
  onTogglePlayPause: () => void;
  showHeader?: boolean;
  showAlbum?: boolean;
}

export const TrackList: React.FC<TrackListProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onTrackPlay,
  onTogglePlayPause,
  showHeader = true,
  showAlbum = true
}) => {
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full">
      {showHeader && (
        <div className="grid grid-cols-12 gap-4 px-6 py-2 text-sm text-gray-400 border-b border-gray-800 mb-2">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-5">TITLE</div>
          {showAlbum && <div className="col-span-3">ALBUM</div>}
          <div className="col-span-2">DATE ADDED</div>
          <div className="col-span-1 text-center">
            <Clock className="w-4 h-4 mx-auto" />
          </div>
        </div>
      )}

      <div className="space-y-1">
        {tracks.map((track, index) => {
          const isCurrentTrack = currentTrack?.id === track.id;
          
          return (
            <div
              key={track.id}
              className="grid grid-cols-12 gap-4 px-6 py-2 rounded-lg hover:bg-gray-800/50 group transition-colors cursor-pointer"
              onClick={() => onTrackPlay(track, tracks, index)}
            >
              {/* Track Number / Play Button */}
              <div className="col-span-1 flex items-center justify-center">
                <div className="relative">
                  <span className={`text-sm ${isCurrentTrack ? 'text-green-500' : 'text-gray-400'} group-hover:hidden`}>
                    {isCurrentTrack && isPlaying ? (
                      <div className="flex space-x-1">
                        <div className="w-1 h-3 bg-green-500 animate-pulse"></div>
                        <div className="w-1 h-3 bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-3 bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    ) : (
                      index + 1
                    )}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCurrentTrack) {
                        onTogglePlayPause();
                      } else {
                        onTrackPlay(track, tracks, index);
                      }
                    }}
                    className="hidden group-hover:block text-white hover:scale-110 transition-transform"
                  >
                    {isCurrentTrack && isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Title and Artist */}
              <div className="col-span-5 flex items-center gap-3">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div>
                  <p className={`text-sm font-medium ${isCurrentTrack ? 'text-green-500' : 'text-white'}`}>
                    {track.title}
                  </p>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
              </div>

              {/* Album */}
              {showAlbum && (
                <div className="col-span-3 flex items-center">
                  <p className="text-sm text-gray-400 hover:text-white hover:underline cursor-pointer">
                    {track.album}
                  </p>
                </div>
              )}

              {/* Date Added */}
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-gray-400">{formatDate(track.releaseDate)}</p>
              </div>

              {/* Duration and Actions */}
              <div className="col-span-1 flex items-center justify-center gap-2">
                <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                  <Heart className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-400 group-hover:hidden">
                  {formatDuration(track.duration)}
                </span>
                <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};