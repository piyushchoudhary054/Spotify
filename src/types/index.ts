export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  genre: string;
  releaseDate: string;
  popularity: number;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  genre: string;
  tracks: Track[];
  totalDuration: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  tracks: Track[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  followers: number;
  genres: string[];
  topTracks: Track[];
  albums: Album[];
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isShuffled: boolean;
  repeatMode: 'off' | 'one' | 'all';
  queue: Track[];
  currentIndex: number;
}

export type ViewType = 'home' | 'search' | 'library' | 'playlist' | 'album' | 'artist';

export interface AppState {
  currentView: ViewType;
  selectedPlaylist: Playlist | null;
  selectedAlbum: Album | null;
  selectedArtist: Artist | null;
  searchQuery: string;
  searchResults: {
    tracks: Track[];
    albums: Album[];
    artists: Artist[];
  };
}