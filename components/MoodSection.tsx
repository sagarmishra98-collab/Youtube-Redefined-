import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Heart, Zap, Coffee, Wind, Music2, Sun } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string;
  duration: number;
}

interface MoodSectionProps {
  onTrackSelect: (track: Track) => void;
}

export function MoodSection({ onTrackSelect }: MoodSectionProps) {
  const moods = [
    {
      id: "happy",
      name: "Happy",
      icon: Sun,
      color: "from-yellow-400 to-orange-500",
      description: "Uplifting & joyful",
      emoji: "😊"
    },
    {
      id: "sad",
      name: "Sad",
      icon: Heart,
      color: "from-blue-500 to-purple-600",
      description: "Melancholic & emotional",
      emoji: "😢"
    },
    {
      id: "energise",
      name: "Energise",
      icon: Zap,
      color: "from-red-500 to-pink-600",
      description: "High energy & motivation",
      emoji: "⚡"
    },
    {
      id: "chill",
      name: "Chill",
      icon: Wind,
      color: "from-teal-400 to-blue-500",
      description: "Relaxed & peaceful",
      emoji: "🌊"
    },
    {
      id: "vibe",
      name: "Vibe",
      icon: Music2,
      color: "from-purple-500 to-indigo-600",
      description: "Good vibes only",
      emoji: "✨"
    },
    {
      id: "focus",
      name: "Focus",
      icon: Coffee,
      color: "from-green-500 to-emerald-600",
      description: "Concentration & work",
      emoji: "🎯"
    }
  ];

  const moodPlaylists = {
    happy: [
      { title: "Good as Hell", artist: "Lizzo", plays: "2.1M" },
      { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", plays: "1.8M" },
      { title: "Happy", artist: "Pharrell Williams", plays: "3.2M" }
    ],
    sad: [
      { title: "Someone You Loved", artist: "Lewis Capaldi", plays: "1.5M" },
      { title: "Breathe Me", artist: "Sia", plays: "890K" },
      { title: "Mad World", artist: "Gary Jules", plays: "1.2M" }
    ],
    energise: [
      { title: "Thunder", artist: "Imagine Dragons", plays: "2.5M" },
      { title: "Stronger", artist: "Kanye West", plays: "1.9M" },
      { title: "Eye of the Tiger", artist: "Survivor", plays: "2.8M" }
    ],
    chill: [
      { title: "Weightless", artist: "Marconi Union", plays: "1.1M" },
      { title: "River", artist: "Leon Bridges", plays: "950K" },
      { title: "Golden", artist: "Jill Scott", plays: "780K" }
    ],
    vibe: [
      { title: "Sunflower", artist: "Post Malone", plays: "3.1M" },
      { title: "Good 4 U", artist: "Olivia Rodrigo", plays: "2.7M" },
      { title: "Levitating", artist: "Dua Lipa", plays: "2.9M" }
    ],
    focus: [
      { title: "Ludovico Einaudi - Nuvole Bianche", artist: "Ludovico Einaudi", plays: "1.3M" },
      { title: "Max Richter - On The Nature of Daylight", artist: "Max Richter", plays: "890K" },
      { title: "Ólafur Arnalds - Near Light", artist: "Ólafur Arnalds", plays: "750K" }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Browse by Mood</h2>
        <div className="grid grid-cols-2 gap-3">
          {moods.map((mood, index) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-gradient-to-br ${mood.color} cursor-pointer hover:scale-105 transition-transform border-0`}>
                <CardContent className="p-4 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <mood.icon className="w-6 h-6" />
                    <span className="text-2xl">{mood.emoji}</span>
                  </div>
                  <h3 className="font-bold text-lg">{mood.name}</h3>
                  <p className="text-sm text-white/80">{mood.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Mood Playlist */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Happy Hits 🌟</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <div className="space-y-3">
          {moodPlaylists.happy.map((track, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">😊</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{track.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{track.plays} plays</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mood Stats */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Music2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Your Mood Today</h3>
              <p className="text-sm text-muted-foreground">Based on your listening history</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-1">😊</div>
              <p className="text-xs text-muted-foreground">Happy</p>
              <p className="font-bold">45%</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">⚡</div>
              <p className="text-xs text-muted-foreground">Energetic</p>
              <p className="font-bold">30%</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🌊</div>
              <p className="text-xs text-muted-foreground">Chill</p>
              <p className="font-bold">25%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}