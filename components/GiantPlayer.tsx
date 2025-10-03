import { Play, Pause, SkipBack, SkipForward, Heart, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useState } from "react";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  duration: number;
}

interface GiantPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onExpand: () => void;
}

export function GiantPlayer({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious, onExpand }: GiantPlayerProps) {
  const [currentTime, setCurrentTime] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-purple-900/40 via-red-900/40 to-pink-900/40 rounded-3xl p-6 mb-6 backdrop-blur-sm border border-white/10 overflow-hidden cursor-pointer"
      onClick={onExpand}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-red-500/20 to-pink-500/20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Floating Music Notes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 text-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ♪
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <motion.div 
            className="relative"
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ 
              duration: 3, 
              repeat: isPlaying ? Infinity : 0, 
              ease: "linear" 
            }}
          >
            <ImageWithFallback
              src={currentTrack.albumCover}
              alt={`${currentTrack.album} cover`}
              className="w-20 h-20 rounded-2xl object-cover shadow-lg"
            />
            
            {/* Vinyl effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-black/30 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
          
          <div className="flex-1 min-w-0">
            <motion.h3 
              className="text-xl font-bold text-white truncate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentTrack.title}
            </motion.h3>
            <motion.p 
              className="text-white/80 truncate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentTrack.artist}
            </motion.p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`text-white/80 hover:text-white ${isLiked ? "text-red-400" : ""}`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <Slider
            value={[currentTime]}
            max={currentTrack.duration}
            step={1}
            className="w-full"
            onValueChange={(value) => setCurrentTime(value[0])}
          />
          <div className="flex justify-between text-xs text-white/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className="text-white/80 hover:text-white"
          >
            <SkipBack className="w-6 h-6" />
          </Button>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              size="lg"
              className="w-14 h-14 rounded-full bg-white text-black hover:bg-white/90"
              onClick={(e) => {
                e.stopPropagation();
                onPlayPause();
              }}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6 ml-1" />
              )}
            </Button>
          </motion.div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="text-white/80 hover:text-white"
          >
            <SkipForward className="w-6 h-6" />
          </Button>
        </div>

        {/* Visualizer Effect */}
        {isPlaying && (
          <div className="flex items-end justify-center gap-1 mt-4 h-8">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-red-400 to-purple-400 rounded-full"
                animate={{
                  height: [8, 32, 8],
                }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}