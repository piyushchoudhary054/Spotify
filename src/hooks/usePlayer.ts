import { useState, useCallback, useRef, useEffect } from 'react';
import { Track, PlayerState } from '../types';

export const usePlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    volume: 0.7,
    isShuffled: false,
    repeatMode: 'off',
    queue: [],
    currentIndex: -1
  });

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = playerState.volume;
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audio.currentTime
      }));
    };
    
    const handleEnded = () => {
      if (playerState.repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playerState.repeatMode]);

  const playTrack = useCallback((track: Track, queue: Track[] = [track], startIndex: number = 0) => {
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl || '';
      setPlayerState(prev => ({
        ...prev,
        currentTrack: track,
        queue,
        currentIndex: startIndex,
        isPlaying: true
      }));
      
      // Since we don't have actual audio files, we'll simulate playback
      audioRef.current.play().catch(() => {
        // Handle play error (no actual audio file)
        console.log('Simulating audio playback for:', track.title);
      });
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current && playerState.currentTrack) {
      if (playerState.isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          console.log('Simulating play/pause for:', playerState.currentTrack?.title);
        });
      }
      
      setPlayerState(prev => ({
        ...prev,
        isPlaying: !prev.isPlaying
      }));
    }
  }, [playerState.isPlaying, playerState.currentTrack]);

  const nextTrack = useCallback(() => {
    const { queue, currentIndex, isShuffled, repeatMode } = playerState;
    
    if (queue.length === 0) return;
    
    let nextIndex: number;
    
    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        if (repeatMode === 'all') {
          nextIndex = 0;
        } else {
          return;
        }
      }
    }
    
    playTrack(queue[nextIndex], queue, nextIndex);
  }, [playerState, playTrack]);

  const prevTrack = useCallback(() => {
    const { queue, currentIndex } = playerState;
    
    if (queue.length === 0) return;
    
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }
    
    playTrack(queue[prevIndex], queue, prevIndex);
  }, [playerState, playTrack]);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setPlayerState(prev => ({ ...prev, volume }));
  }, []);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const toggleShuffle = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isShuffled: !prev.isShuffled }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      repeatMode: prev.repeatMode === 'off' ? 'all' : prev.repeatMode === 'all' ? 'one' : 'off'
    }));
  }, []);

  return {
    playerState,
    playTrack,
    togglePlayPause,
    nextTrack,
    prevTrack,
    setVolume,
    seekTo,
    toggleShuffle,
    toggleRepeat
  };
};