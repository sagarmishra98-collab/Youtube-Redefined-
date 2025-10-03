import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Play, Shuffle, Clock, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GiantPlayer } from "./GiantPlayer";
import { MoodSection } from "./MoodSection";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  duration: number;
}

interface HomePageProps {
  onTrackSelect: (track: Track) => void;
  recentTracks: Track[];
  trendingTracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onExpandPlayer: () => void;
}

export function HomePage({ 
  onTrackSelect, 
  recentTracks, 
  trendingTracks,
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onExpandPlayer
}: HomePageProps) {
  return (
    <div className="pb-20">
      <div className="p-4">
        {/* Giant Player */}
        <GiantPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={onPlayPause}
          onNext={onNext}
          onPrevious={onPrevious}
          onExpand={onExpandPlayer}
        />

        {/* Mood Section */}
        <MoodSection onTrackSelect={onTrackSelect} />

        <div className="grid grid-cols-2 gap-3 my-6">
          <Card className="bg-gradient-to-r from-red-500 to-pink-500">
            <CardContent className="p-4 flex items-center gap-3">
              <Shuffle className="w-6 h-6 text-white" />
              <div>
                <p className="text-white font-medium">Shuffle Play</p>
                <p className="text-white/80 text-sm">All songs</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-blue-500">
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="w-6 h-6 text-white" />
              <div>
                <p className="text-white font-medium">Recently Played</p>
                <p className="text-white/80 text-sm">Continue</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recently Played */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recently Played</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-3">
            {recentTracks.slice(0, 4).map((track) => (
              <Card 
                key={track.id} 
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onTrackSelect(track)}
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="relative">
                    <ImageWithFallback
                      src={track.albumCover}
                      alt={track.album}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{track.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <Play className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trending Now */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-bold">Trending Now</h2>
            </div>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2">
            {trendingTracks.map((track, index) => (
              <Card 
                key={track.id} 
                className="flex-shrink-0 w-40 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => onTrackSelect(track)}
              >
                <CardContent className="p-3">
                  <div className="relative mb-3">
                    <ImageWithFallback
                      src={track.albumCover}
                      alt={track.album}
                      className="w-full aspect-square rounded-lg object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      #{index + 1}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <p className="font-medium text-sm truncate">{track.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Made For You */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Made For You</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gradient-to-br from-orange-500 to-red-500">
              <CardContent className="p-4 text-center text-white">
                <p className="font-medium">Discover Weekly</p>
                <p className="text-sm opacity-80">Your weekly mix</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-teal-500">
              <CardContent className="p-4 text-center text-white">
                <p className="font-medium">Release Radar</p>
                <p className="text-sm opacity-80">New releases for you</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}