import { StatsOverview } from "./StatsOverview";
import { TopChartsSection } from "./TopChartsSection";
import { SongAnalyticsCard } from "./SongAnalyticsCard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  playCount: number;
  totalTimeSpent: number;
  albumCover: string;
  lastPlayed: string;
}

interface AnalyticsPageProps {
  songs: Song[];
}

export function AnalyticsPage({ songs }: AnalyticsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("playCount");

  // Calculate overview stats
  const totalSongs = songs.length;
  const totalPlaytime = songs.reduce((sum, song) => sum + song.totalTimeSpent, 0);
  const totalPlays = songs.reduce((sum, song) => sum + song.playCount, 0);
  const averageSessionTime = Math.round(totalPlaytime / totalPlays);

  // Filter and sort songs
  const filteredSongs = songs
    .filter(song => 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.album.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "playCount":
          return b.playCount - a.playCount;
        case "totalTimeSpent":
          return b.totalTimeSpent - a.totalTimeSpent;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="pb-20">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Your Music Analytics</h2>
          <p className="text-muted-foreground">
            Discover your listening patterns and favorite tracks
          </p>
        </div>

        <StatsOverview
          totalSongs={totalSongs}
          totalPlaytime={totalPlaytime}
          totalPlays={totalPlays}
          averageSessionTime={averageSessionTime}
        />

        <TopChartsSection songs={songs} />

        <div className="mb-6">
          <div className="flex flex-col gap-4 mb-4">
            <h3 className="text-lg font-bold">Song Analytics</h3>
            
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search songs, artists, albums..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="playCount">Most Played</SelectItem>
                  <SelectItem value="totalTimeSpent">Most Time Spent</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredSongs.map((song) => (
            <SongAnalyticsCard key={song.id} song={song} />
          ))}
        </div>

        {filteredSongs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No songs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}