import { Track, Album, Playlist, Artist } from '../types';

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 200,
    coverUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop',
    releaseDate: '2020-03-20',
    popularity: 95
  },
  {
    id: '2',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    duration: 174,
    coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop',
    releaseDate: '2020-05-18',
    popularity: 88
  },
  {
    id: '3',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178,
    coverUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop Rock',
    releaseDate: '2021-05-14',
    popularity: 92
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: 203,
    coverUrl: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Dance Pop',
    releaseDate: '2020-03-27',
    popularity: 90
  },
  {
    id: '5',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    album: 'Stay',
    duration: 141,
    coverUrl: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop',
    releaseDate: '2021-07-09',
    popularity: 94
  },
  {
    id: '6',
    title: 'Industry Baby',
    artist: 'Lil Nas X ft. Jack Harlow',
    album: 'MONTERO',
    duration: 212,
    coverUrl: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Hip Hop',
    releaseDate: '2021-07-23',
    popularity: 89
  },
  {
    id: '7',
    title: 'Heat Waves',
    artist: 'Glass Animals',
    album: 'Dreamland',
    duration: 238,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Indie Pop',
    releaseDate: '2020-08-29',
    popularity: 87
  },
  {
    id: '8',
    title: 'As It Was',
    artist: 'Harry Styles',
    album: "Harry's House",
    duration: 167,
    coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    genre: 'Pop Rock',
    releaseDate: '2022-04-01',
    popularity: 96
  }
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    coverUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300',
    releaseDate: '2020-03-20',
    genre: 'Pop',
    tracks: [mockTracks[0]],
    totalDuration: 3400
  },
  {
    id: '2',
    title: 'Fine Line',
    artist: 'Harry Styles',
    coverUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    releaseDate: '2019-12-13',
    genre: 'Pop Rock',
    tracks: [mockTracks[1]],
    totalDuration: 2892
  },
  {
    id: '3',
    title: 'SOUR',
    artist: 'Olivia Rodrigo',
    coverUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    releaseDate: '2021-05-21',
    genre: 'Pop Rock',
    tracks: [mockTracks[2]],
    totalDuration: 2082
  },
  {
    id: '4',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    coverUrl: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300',
    releaseDate: '2020-03-27',
    genre: 'Dance Pop',
    tracks: [mockTracks[3]],
    totalDuration: 2234
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'My Top Hits',
    description: 'Your favorite songs all in one place',
    coverUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: mockTracks.slice(0, 5),
    isPublic: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: 'Relaxing tunes for a peaceful day',
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: mockTracks.slice(2, 6),
    isPublic: false,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'Workout Mix',
    description: 'High-energy songs to keep you motivated',
    coverUrl: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=300',
    tracks: mockTracks.slice(4, 8),
    isPublic: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-22'
  }
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'The Weeknd',
    imageUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=300',
    followers: 45000000,
    genres: ['Pop', 'R&B', 'Alternative'],
    topTracks: [mockTracks[0]],
    albums: [mockAlbums[0]]
  },
  {
    id: '2',
    name: 'Harry Styles',
    imageUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
    followers: 38000000,
    genres: ['Pop', 'Rock', 'Folk'],
    topTracks: [mockTracks[1], mockTracks[7]],
    albums: [mockAlbums[1]]
  },
  {
    id: '3',
    name: 'Olivia Rodrigo',
    imageUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300',
    followers: 22000000,
    genres: ['Pop', 'Pop Rock', 'Alternative'],
    topTracks: [mockTracks[2]],
    albums: [mockAlbums[2]]
  }
];

export const featuredGenres = [
  { name: 'Pop', color: 'bg-pink-500', tracks: mockTracks.filter(t => t.genre.includes('Pop')) },
  { name: 'Hip Hop', color: 'bg-purple-500', tracks: mockTracks.filter(t => t.genre === 'Hip Hop') },
  { name: 'Rock', color: 'bg-red-500', tracks: mockTracks.filter(t => t.genre.includes('Rock')) },
  { name: 'Electronic', color: 'bg-blue-500', tracks: [] },
  { name: 'Jazz', color: 'bg-yellow-500', tracks: [] },
  { name: 'Classical', color: 'bg-indigo-500', tracks: [] }
];