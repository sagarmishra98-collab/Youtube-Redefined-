import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Search, TrendingUp, Clock, Play } from "lucide-react";
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

interface SearchPageProps {
  onTrackSelect: (track: Track) => void;
  allTracks: Track[];
}

export function SearchPage({ onTrackSelect, allTracks }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const recentSearches = [
    "The Weeknd",
    "Heat Waves",
    "Harry Styles",
    "Olivia Rodrigo",
    "Pop music"
  ];

  const trendingSearches = [
    "Blinding Lights",
    "As It Was",
    "Good 4 U",
    "Watermelon Sugar",
    "Industry Baby"
  ];

  const filteredTracks = allTracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-20">
      <div className="p-4">
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search songs, artists, albums..."
            className="pl-12 h-12 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Search Results</h2>
            {filteredTracks.length > 0 ? (
              <div className="space-y-3">
                {filteredTracks.slice(0, 10).map((track) => (
                  <Card 
                    key={track.id} 
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => onTrackSelect(track)}
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <ImageWithFallback
                        src={track.albumCover}
                        alt={track.album}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{track.title}</p>
                        <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                        <p className="text-xs text-muted-foreground truncate">{track.album}</p>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}

        {/* Recent Searches */}
        {!searchQuery && (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-bold">Recent Searches</h2>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(search)}
                    className="rounded-full"
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>

            {/* Trending Searches */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold">Trending</h2>
              </div>
              
              <div className="space-y-3">
                {trendingSearches.map((search, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => setSearchQuery(search)}
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">#{index + 1}</span>
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium">{search}</p>
                        <p className="text-sm text-muted-foreground">Trending now</p>
                      </div>
                      
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Browse Categories */}
            <div>
              <h2 className="text-lg font-bold mb-4">Browse All</h2>
              
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500 cursor-pointer">
                  <CardContent className="p-4 text-center text-white">
                    <p className="font-medium">Pop</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 cursor-pointer">
                  <CardContent className="p-4 text-center text-white">
                    <p className="font-medium">Hip Hop</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-500 to-teal-500 cursor-pointer">
                  <CardContent className="p-4 text-center text-white">
                    <p className="font-medium">Rock</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-orange-500 to-red-500 cursor-pointer">
                  <CardContent className="p-4 text-center text-white">
                    <p className="font-medium">Electronic</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 cursor-pointer">
                  <CardContent className="p-4 text-center text-white">
                    <p className="font-medium">R&B</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-indigo-500 to-purple-500 cursor-pointer">
                  <CardContent className="p-4 text-center text-white">
                    <p className="font-medium">Jazz</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}