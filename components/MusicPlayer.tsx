import { Play, Pause, SkipBack, SkipForward, Heart, MoreHorizontal, Shuffle, Repeat } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  duration: number;
}

interface MusicPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function MusicPlayer({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious }: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Album Art */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative">
          <ImageWithFallback
            src={currentTrack.albumCover}
            alt={`${currentTrack.album} cover`}
            className="w-80 h-80 rounded-2xl shadow-2xl object-cover"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Track Info */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold truncate">{currentTrack.title}</h2>
            <p className="text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : "text-muted-foreground"}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={currentTrack.duration}
            step={1}
            className="w-full"
            onValueChange={(value) => setCurrentTime(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsShuffled(!isShuffled)}
            className={isShuffled ? "text-red-500" : "text-muted-foreground"}
          >
            <Shuffle className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onPrevious}>
              <SkipBack className="w-6 h-6" />
            </Button>
            
            <Button
              size="lg"
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white"
              onClick={onPlayPause}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onNext}>
              <SkipForward className="w-6 h-6" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRepeatMode((repeatMode + 1) % 3)}
            className={repeatMode > 0 ? "text-red-500" : "text-muted-foreground"}
          >
            <Repeat className="w-5 h-5" />
            {repeatMode === 2 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                1
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}