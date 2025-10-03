import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Play, Clock, BarChart3 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SongAnalyticsCardProps {
  song: {
    id: string;
    title: string;
    artist: string;
    album: string;
    playCount: number;
    totalTimeSpent: number; // in seconds
    albumCover: string;
    lastPlayed: string;
  };
}

export function SongAnalyticsCard({ song }: SongAnalyticsCardProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getPlayCountColor = (count: number) => {
    if (count >= 50) return "bg-red-500";
    if (count >= 20) return "bg-orange-500";
    if (count >= 10) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative">
            <ImageWithFallback
              src={song.albumCover}
              alt={`${song.album} album cover`}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="absolute -top-2 -right-2">
              <Badge 
                variant="secondary" 
                className={`${getPlayCountColor(song.playCount)} text-white border-0 px-2 py-1`}
              >
                {song.playCount}
              </Badge>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{song.title}</h3>
            <p className="text-muted-foreground text-sm truncate">{song.artist}</p>
            <p className="text-muted-foreground text-xs truncate">{song.album}</p>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 text-sm">
                <Play className="w-4 h-4 text-muted-foreground" />
                <span>{song.playCount} plays</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{formatTime(song.totalTimeSpent)}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              Last played: {song.lastPlayed}
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <BarChart3 className="w-5 h-5 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Analytics</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}