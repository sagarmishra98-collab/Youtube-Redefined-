import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { UserPlus, Music, Users, MessageCircle, Library } from "lucide-react";
import { FriendPlaylists } from "./FriendPlaylists";
import { useState } from "react";

export function SocialConnect() {
  const [activeTab, setActiveTab] = useState("connect");
  const suggestions = [
    {
      id: "1",
      name: "Alex Johnson",
      mutualFriends: 12,
      avatar: "https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2NpYWwlMjBtZWRpYSUyMGljb25zJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU5NDk1NjcyfDA&ixlib=rb-4.1.0&q=80&w=100",
      recentSong: "Blinding Lights - The Weeknd"
    },
    {
      id: "2", 
      name: "Sarah Chen",
      mutualFriends: 8,
      avatar: "https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2NpYWwlMjBtZWRpYSUyMGljb25zJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU5NDk1NjcyfDA&ixlib=rb-4.1.0&q=80&w=100",
      recentSong: "Heat Waves - Glass Animals"
    },
    {
      id: "3",
      name: "Mike Wilson", 
      mutualFriends: 15,
      avatar: "https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2NpYWwlMjBtZWRpYSUyMGljb25zJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU5NDk1NjcyfDA&ixlib=rb-4.1.0&q=80&w=100",
      recentSong: "As It Was - Harry Styles"
    }
  ];

  const socialPlatforms = [
    { name: "Facebook", color: "bg-blue-600", connected: true },
    { name: "Instagram", color: "bg-pink-600", connected: false },
    { name: "Twitter", color: "bg-sky-500", connected: true },
    { name: "TikTok", color: "bg-black", connected: false },
  ];

  return (
    <div className="pb-20">
      <div className="p-4">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "connect" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("connect")}
            className="flex-1"
          >
            <Users className="w-4 h-4 mr-2" />
            Connect
          </Button>
          <Button
            variant={activeTab === "playlists" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("playlists")}
            className="flex-1"
          >
            <Library className="w-4 h-4 mr-2" />
            Friend Playlists
          </Button>
        </div>

        {activeTab === "playlists" ? (
          <FriendPlaylists />
        ) : (
          <div className="space-y-6">
        {/* Connect Social Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-red-500" />
              Connect Social Accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {socialPlatforms.map((platform) => (
              <div key={platform.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">
                      {platform.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{platform.name}</span>
                </div>
                
                {platform.connected ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Connected
                  </Badge>
                ) : (
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Friend Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-red-500" />
              People You May Know
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((person) => (
              <div key={person.id} className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={person.avatar} />
                  <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{person.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {person.mutualFriends} mutual friends
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Music className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground truncate">
                      {person.recentSong}
                    </p>
                  </div>
                </div>
                
                <Button size="sm" variant="outline">
                  <UserPlus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-red-500" />
              Friend Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Alex Johnson</span> is listening to{" "}
                  <span className="font-medium">Watermelon Sugar</span>
                </p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Sarah Chen</span> added{" "}
                  <span className="font-medium">Good 4 U</span> to their favorites
                </p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>MW</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">Mike Wilson</span> shared a playlist{" "}
                  <span className="font-medium">Weekend Vibes</span>
                </p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
          </div>
        )}
      </div>
    </div>
  );
}