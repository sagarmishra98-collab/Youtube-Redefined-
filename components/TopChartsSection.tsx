import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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

interface TopChartsSectionProps {
  songs: Song[];
}

export function TopChartsSection({ songs }: TopChartsSectionProps) {
  // Prepare data for charts
  const topSongsByPlays = songs
    .sort((a, b) => b.playCount - a.playCount)
    .slice(0, 5)
    .map(song => ({
      name: song.title.length > 15 ? song.title.substring(0, 15) + "..." : song.title,
      plays: song.playCount
    }));

  const topSongsByTime = songs
    .sort((a, b) => b.totalTimeSpent - a.totalTimeSpent)
    .slice(0, 5)
    .map(song => ({
      name: song.title.length > 15 ? song.title.substring(0, 15) + "..." : song.title,
      time: Math.round(song.totalTimeSpent / 60) // convert to minutes
    }));

  const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Most Played Songs</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSongsByPlays}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Bar dataKey="plays" fill="#ff6b6b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Listening Time Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topSongsByTime}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="time"
                label={({ name, value }) => `${name}: ${value}m`}
              >
                {topSongsByTime.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}