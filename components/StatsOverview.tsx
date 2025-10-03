import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Music, Clock, PlayCircle, Calendar } from "lucide-react";

interface StatsOverviewProps {
  totalSongs: number;
  totalPlaytime: number;
  totalPlays: number;
  averageSessionTime: number;
}

export function StatsOverview({ totalSongs, totalPlaytime, totalPlays, averageSessionTime }: StatsOverviewProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const stats = [
    {
      title: "Total Songs",
      value: totalSongs.toString(),
      icon: Music,
      description: "in your library"
    },
    {
      title: "Total Playtime",
      value: formatTime(totalPlaytime),
      icon: Clock,
      description: "time listening"
    },
    {
      title: "Total Plays",
      value: totalPlays.toLocaleString(),
      icon: PlayCircle,
      description: "songs played"
    },
    {
      title: "Avg Session",
      value: formatTime(averageSessionTime),
      icon: Calendar,
      description: "per session"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}