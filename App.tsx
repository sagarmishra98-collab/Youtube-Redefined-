import { useState, useEffect } from "react";
import { MobileHeader } from "./components/MobileHeader";
import { BottomNavigation } from "./components/BottomNavigation";
import { HomePage } from "./components/HomePage";
import { SearchPage } from "./components/SearchPage";
import { MusicPlayer } from "./components/MusicPlayer";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { PremiumPage } from "./components/PremiumPage";
import { SocialConnect } from "./components/SocialConnect";

// Mock data for songs
const mockSongs = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    playCount: 87,
    totalTimeSpent: 8700,
    albumCover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJzJTIwdmlueWwlMjByZWNvcmRzfGVufDF8fHx8MTc1OTQ5NTQyNXww&ixlib=rb-4.1.0&q=80&w=300",
    lastPlayed: "2 hours ago",
    duration: 201
  },
  {
    id: "2",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    playCount: 56,
    totalTimeSpent: 5600,
    albumCover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJzJTIwdmlueWwlMjByZWNvcmRzfGVufDF8fHx8MTc1OTQ5NTQyNXww&ixlib=rb-4.1.0&q=80&w=300",
    lastPlayed: "1 day ago",
    duration: 174
  },
  {
    id: "3",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    playCount: 43,
    totalTimeSpent: 4300,
    albumCover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJzJTIwdmlueWwlMjByZWNvcmRzfGVufDF8fHx8MTc1OTQ5NTQyNXww&ixlib=rb-4.1.0&q=80&w=300",
    lastPlayed: "3 days ago",
    duration: 178
  },
  {
    id: "4",
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
    playCount: 72,
    totalTimeSpent: 7200,
    albumCover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJzJTIwdmlueWwlMjByZWNvcmRzfGVufDF8fHx8MTc1OTQ5NTQyNXww&ixlib=rb-4.1.0&q=80&w=300",
    lastPlayed: "5 hours ago",
    duration: 141
  },
  {
    id: "5",
    title: "Industry Baby",
    artist: "Lil Nas X & Jack Harlow",
    album: "MONTERO",
    playCount: 38,
    totalTimeSpent: 3800,
    albumCover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJzJTIwdmlueWwlMjByZWNvcmRzfGVufDF8fHx8MTc1OTQ5NTQyNXww&ixlib=rb-4.1.0&q=80&w=300",
    lastPlayed: "1 week ago",
    duration: 213
  },
  {
    id: "6",
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    playCount: 91,
    totalTimeSpent: 9100,
    albumCover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJzJTIwdmlueWwlMjByZWNvcmRzfGVufDF8fHx8MTc1OTQ5NTQyNXww&ixlib=rb-4.1.0&q=80&w=300",
    lastPlayed: "Yesterday",
    duration: 238
  },
  {
    id: "7",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    playCount: 29,
    totalTimeSpent: 2900,
    albumCover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJzJTIwdmlueWwlMjByZWNvcmRzfGVufDF8fHx8MTc1OTQ5NTQyNXww&ixlib=rb-4.1.0&q=80&w=300",
    lastPlayed: "2 days ago",
    duration: 203
  },
  {
    id: "8",
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    playCount: 64,
    totalTimeSpent: 6400,
    albumCover: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJzJTIwdmlueWwlMjByZWNvcmRzfGVufDF8fHx8MTc1OTQ5NTQyNXww&ixlib=rb-4.1.0&q=80&w=300",
    lastPlayed: "4 hours ago",
    duration: 167
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [currentTrack, setCurrentTrack] = useState(mockSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  // Enable dark theme by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleTrackSelect = (track: typeof mockSongs[0]) => {
    setCurrentTrack(track);
    setShowPlayer(true);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = mockSongs.findIndex(song => song.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % mockSongs.length;
    setCurrentTrack(mockSongs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = mockSongs.findIndex(song => song.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + mockSongs.length) % mockSongs.length;
    setCurrentTrack(mockSongs[prevIndex]);
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "home": return "Home";
      case "search": return "Search";
      case "library": return "Your Library";
      case "analytics": return "Analytics";
      case "premium": return "Premium";
      default: return "Home";
    }
  };

  const renderContent = () => {
    if (showPlayer) {
      return (
        <div className="h-full">
          <button 
            onClick={() => setShowPlayer(false)}
            className="absolute top-4 left-4 z-50 p-2 bg-black/20 rounded-full backdrop-blur-sm"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7-7m0 0l-7 7m7-7v18" />
            </svg>
          </button>
          <MusicPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      );
    }

    switch (activeTab) {
      case "home":
        return (
          <HomePage
            onTrackSelect={handleTrackSelect}
            recentTracks={mockSongs.slice(0, 4)}
            trendingTracks={mockSongs.slice(2, 6)}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onExpandPlayer={() => setShowPlayer(true)}
          />
        );
      case "search":
        return (
          <SearchPage
            onTrackSelect={handleTrackSelect}
            allTracks={mockSongs}
          />
        );
      case "library":
        return <SocialConnect />;
      case "analytics":
        return <AnalyticsPage songs={mockSongs} />;
      case "premium":
        return <PremiumPage />;
      default:
        return (
          <HomePage
            onTrackSelect={handleTrackSelect}
            recentTracks={mockSongs.slice(0, 4)}
            trendingTracks={mockSongs.slice(2, 6)}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onExpandPlayer={() => setShowPlayer(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!showPlayer && (
        <MobileHeader 
          title={getPageTitle()} 
          showSocial={activeTab === "home"} 
        />
      )}
      
      <main className={showPlayer ? "h-screen" : ""}>
        {renderContent()}
      </main>

      {!showPlayer && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}
    </div>
  );
}