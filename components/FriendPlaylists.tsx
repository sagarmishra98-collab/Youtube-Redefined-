import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Star, Play, Heart, Share, MoreHorizontal, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface Playlist {
  id: string;
  name: string;
  creator: {
    name: string;
    avatar: string;
    username: string;
  };
  trackCount: number;
  duration: string;
  description: string;
  rating: number;
  userRating?: number;
  plays: string;
  isLiked: boolean;
  tags: string[];
  lastUpdated: string;
  coverImage: string;
}

export function FriendPlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: "1",
      name: "Weekend Vibes ✨",
      creator: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2NpYWwlMjBtZWRpYSUyMGljb25zJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU5NDk1NjcyfDA&ixlib=rb-4.1.0&q=80&w=100",
        username: "@alex_music"
      },
      trackCount: 24,
      duration: "1h 32m",
      description: "Perfect mix for weekend relaxation and good vibes",
      rating: 4.8,
      userRating: 5,
      plays: "1.2K",
      isLiked: true,
      tags: ["Chill", "Pop", "Indie"],
      lastUpdated: "2 days ago",
      coverImage: "https://images.unsplash.com/photo-1758273706238-79dc0cc739aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGVuZXJnZXRpYyUyMG11c2ljJTIwdmliZXN8ZW58MXx8fHwxNzU5NDk2MTY5fDA&ixlib=rb-4.1.0&q=80&w=300"
    },
    {
      id: "2",
      name: "Workout Beast Mode 💪",
      creator: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2NpYWwlMjBtZWRpYSUyMGljb25zJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU5NDk1NjcyfDA&ixlib=rb-4.1.0&q=80&w=100",
        username: "@sarahfit"
      },
      trackCount: 35,
      duration: "2h 8m",
      description: "High-energy tracks to fuel your workout sessions",
      rating: 4.6,
      plays: "856",
      isLiked: false,
      tags: ["Hip-Hop", "Electronic", "Motivational"],
      lastUpdated: "1 week ago",
      coverImage: "https://images.unsplash.com/photo-1718715463369-ee0f12f06847?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGhlYWRwaG9uZXMlMjBkYXJrJTIwYWVzdGhldGljfGVufDF8fHx8MTc1OTQ5NTY2OXww&ixlib=rb-4.1.0&q=80&w=300"
    },
    {
      id: "3",
      name: "Late Night Study 📚",
      creator: {
        name: "Mike Wilson",
        avatar: "https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2NpYWwlMjBtZWRpYSUyMGljb25zJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU5NDk1NjcyfDA&ixlib=rb-4.1.0&q=80&w=100",
        username: "@mikebeats"
      },
      trackCount: 18,
      duration: "1h 12m",
      description: "Ambient and instrumental tracks for deep focus",
      rating: 4.9,
      userRating: 4,
      plays: "2.3K",
      isLiked: true,
      tags: ["Ambient", "Classical", "Focus"],
      lastUpdated: "3 days ago",
      coverImage: "https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGFsYnVtJTIwY292ZXJzJTIwdmlueWwlMjByZWNvcmRzfGVufDF8fHx8MTc1OTQ5NTQyNXww&ixlib=rb-4.1.0&q=80&w=300"
    }
  ]);

  const handleRating = (playlistId: string, rating: number) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, userRating: rating }
        : playlist
    ));
  };

  const handleLike = (playlistId: string) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === playlistId 
        ? { ...playlist, isLiked: !playlist.isLiked }
        : playlist
    ));
  };

  const renderStars = (rating: number, interactive: boolean = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate && onRate(star)}
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          >
            <Star
              className={`w-4 h-4 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-red-500" />
          <h2 className="text-xl font-bold">Friend Playlists</h2>
        </div>
        <Button variant="ghost" size="sm">View All</Button>
      </div>

      <div className="space-y-4">
        {playlists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Playlist Cover */}
                  <div 
                    className="w-24 h-24 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${playlist.coverImage})` }}
                  >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Playlist Info */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">{playlist.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={playlist.creator.avatar} />
                            <AvatarFallback>{playlist.creator.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            {playlist.creator.name}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(playlist.id)}
                          className={playlist.isLiked ? "text-red-500" : "text-muted-foreground"}
                        >
                          <Heart className={`w-4 h-4 ${playlist.isLiked ? "fill-current" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2 truncate">
                      {playlist.description}
                    </p>

                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-xs text-muted-foreground">
                        {playlist.trackCount} tracks • {playlist.duration}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {playlist.plays} plays
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex gap-1 mb-3">
                      {playlist.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Rating Section */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {renderStars(playlist.rating)}
                          <span className="text-sm text-muted-foreground ml-1">
                            {playlist.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Your rating:</span>
                        {renderStars(
                          playlist.userRating || 0,
                          true,
                          (rating) => handleRating(playlist.id, rating)
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Create Playlist CTA */}
      <Card className="border-dashed border-2 border-muted-foreground/30">
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Users className="w-8 h-8 text-muted-foreground" />
            <h3 className="font-medium">Share Your Playlist</h3>
            <p className="text-sm text-muted-foreground">
              Create and share your own playlists with friends
            </p>
            <Button className="mt-2">Create Playlist</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}