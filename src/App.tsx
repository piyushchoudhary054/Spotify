import React, { useState, useCallback, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Player } from './components/Player';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { PlaylistView } from './components/PlaylistView';
import { AlbumView } from './components/AlbumView';
import { usePlayer } from './hooks/usePlayer';
import { mockTracks, mockAlbums, mockPlaylists, mockArtists } from './data/mockData';
import { Track, Album, Artist, Playlist, ViewType, AppState } from './types';

function App() {
  const {
    playerState,
    playTrack,
    togglePlayPause,
    nextTrack,
    prevTrack,
    setVolume,
    seekTo,
    toggleShuffle,
    toggleRepeat
  } = usePlayer();

  const [appState, setAppState] = useState<AppState>({
    currentView: 'home',
    selectedPlaylist: null,
    selectedAlbum: null,
    selectedArtist: null,
    searchQuery: '',
    searchResults: {
      tracks: [],
      albums: [],
      artists: []
    }
  });

  const handleViewChange = useCallback((view: ViewType) => {
    setAppState(prev => ({
      ...prev,
      currentView: view,
      selectedPlaylist: null,
      selectedAlbum: null,
      selectedArtist: null
    }));
  }, []);

  const handlePlaylistSelect = useCallback((playlist: Playlist) => {
    setAppState(prev => ({
      ...prev,
      currentView: 'playlist',
      selectedPlaylist: playlist
    }));
  }, []);

  const handleAlbumSelect = useCallback((album: Album) => {
    setAppState(prev => ({
      ...prev,
      currentView: 'album',
      selectedAlbum: album
    }));
  }, []);

  const handleArtistSelect = useCallback((artist: Artist) => {
    setAppState(prev => ({
      ...prev,
      currentView: 'artist',
      selectedArtist: artist
    }));
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setAppState(prev => ({
      ...prev,
      searchQuery: query,
      searchResults: {
        tracks: query ? mockTracks.filter(track => 
          track.title.toLowerCase().includes(query.toLowerCase()) ||
          track.artist.toLowerCase().includes(query.toLowerCase()) ||
          track.album.toLowerCase().includes(query.toLowerCase())
        ) : [],
        albums: query ? mockAlbums.filter(album =>
          album.title.toLowerCase().includes(query.toLowerCase()) ||
          album.artist.toLowerCase().includes(query.toLowerCase())
        ) : [],
        artists: query ? mockArtists.filter(artist =>
          artist.name.toLowerCase().includes(query.toLowerCase())
        ) : []
      }
    }));
  }, []);

  const renderMainContent = useMemo(() => {
    switch (appState.currentView) {
      case 'home':
        return (
          <HomeView
            recentTracks={mockTracks}
            featuredAlbums={mockAlbums}
            recentPlaylists={mockPlaylists}
            onTrackPlay={playTrack}
            onAlbumSelect={handleAlbumSelect}
            onPlaylistSelect={handlePlaylistSelect}
          />
        );
      case 'search':
        return (
          <SearchView
            searchQuery={appState.searchQuery}
            searchResults={appState.searchResults}
            onTrackPlay={playTrack}
            onAlbumSelect={handleAlbumSelect}
            onArtistSelect={handleArtistSelect}
          />
        );
      case 'playlist':
        return appState.selectedPlaylist ? (
          <PlaylistView
            playlist={appState.selectedPlaylist}
            currentTrack={playerState.currentTrack}
            isPlaying={playerState.isPlaying}
            onTrackPlay={playTrack}
            onTogglePlayPause={togglePlayPause}
          />
        ) : null;
      case 'album':
        return appState.selectedAlbum ? (
          <AlbumView
            album={appState.selectedAlbum}
            currentTrack={playerState.currentTrack}
            isPlaying={playerState.isPlaying}
            onTrackPlay={playTrack}
            onTogglePlayPause={togglePlayPause}
          />
        ) : null;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">View not implemented yet</p>
          </div>
        );
    }
  }, [
    appState,
    playerState.currentTrack,
    playerState.isPlaying,
    playTrack,
    togglePlayPause,
    handleAlbumSelect,
    handlePlaylistSelect,
    handleArtistSelect
  ]);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        currentView={appState.currentView}
        onViewChange={handleViewChange}
        playlists={mockPlaylists}
        onPlaylistSelect={handlePlaylistSelect}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          searchQuery={appState.searchQuery}
          onSearchChange={handleSearchChange}
          currentView={appState.currentView}
        />
        
        <main className="flex-1 overflow-y-auto pb-24">
          {renderMainContent}
        </main>
      </div>

      {/* Player */}
      <Player
        playerState={playerState}
        onTogglePlayPause={togglePlayPause}
        onPrevTrack={prevTrack}
        onNextTrack={nextTrack}
        onSeek={seekTo}
        onVolumeChange={setVolume}
        onToggleShuffle={toggleShuffle}
        onToggleRepeat={toggleRepeat}
      />
    </div>
  );
}

export default App;