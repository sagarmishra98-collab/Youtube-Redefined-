import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { X, Send, Search, Music, Play } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
  unreadCount: number;
  lastMessage: {
    text: string;
    time: string;
    fromUser: boolean;
    songShared?: {
      title: string;
      artist: string;
    };
  };
}

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MessagesModal({ isOpen, onClose }: MessagesModalProps) {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const friends: Friend[] = [
    {
      id: "1",
      name: "Alex Johnson",
      username: "@alex_music",
      avatar: "https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2NpYWwlMjBtZWRpYSUyMGljb25zJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU5NDk1NjcyfDA&ixlib=rb-4.1.0&q=80&w=100",
      isOnline: true,
      lastSeen: "Online",
      unreadCount: 2,
      lastMessage: {
        text: "Check out this amazing song! 🎵",
        time: "2m ago",
        fromUser: false,
        songShared: {
          title: "Blinding Lights",
          artist: "The Weeknd"
        }
      }
    },
    {
      id: "2",
      name: "Sarah Chen",
      username: "@sarahfit",
      avatar: "https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2NpYWwlMjBtZWRpYSUyMGljb25zJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU5NDk1NjcyfDA&ixlib=rb-4.1.0&q=80&w=100",
      isOnline: false,
      lastSeen: "5m ago",
      unreadCount: 0,
      lastMessage: {
        text: "Thanks for the playlist recommendation!",
        time: "1h ago",
        fromUser: true
      }
    },
    {
      id: "3",
      name: "Mike Wilson",
      username: "@mikebeats",
      avatar: "https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2NpYWwlMjBtZWRpYSUyMGljb25zJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU5NDk1NjcyfDA&ixlib=rb-4.1.0&q=80&w=100",
      isOnline: true,
      lastSeen: "Online",
      unreadCount: 1,
      lastMessage: {
        text: "Love your weekend vibes playlist!",
        time: "30m ago",
        fromUser: false
      }
    },
    {
      id: "4",
      name: "Emma Davis",
      username: "@emmamusic",
      avatar: "https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2NpYWwlMjBtZWRpYSUyMGljb25zJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU5NDk1NjcyfDA&ixlib=rb-4.1.0&q=80&w=100",
      isOnline: false,
      lastSeen: "2h ago",
      unreadCount: 0,
      lastMessage: {
        text: "See you at the concert tonight! 🎤",
        time: "3h ago",
        fromUser: false
      }
    }
  ];

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim() && selectedFriend) {
      // Here you would typically send the message to your backend
      console.log(`Sending message to ${selectedFriend.name}: ${messageText}`);
      setMessageText("");
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-red-900/90 backdrop-blur-xl border border-white/10 rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl shadow-purple-500/20"
        initial={{ scale: 0.8, opacity: 0, rotateX: 10 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateX: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-3 bg-gradient-to-r from-red-500/20 to-purple-500/20 border-b border-white/10">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
                <Music className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Messages</h2>
                <p className="text-sm text-white/70 font-normal">Connect with friends</p>
              </div>
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full w-10 h-10 p-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <Input
              placeholder="Search friends..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-purple-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>

        {selectedFriend ? (
          // Chat View
          <div className="flex flex-col h-[60vh]">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-gradient-to-r from-purple-500/20 to-red-500/20">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFriend(null)}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full w-9 h-9 p-0"
              >
                ←
              </Button>
              <Avatar className="w-10 h-10 ring-2 ring-purple-400/50">
                <AvatarImage src={selectedFriend.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-red-500 text-white">
                  {selectedFriend.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium text-white">{selectedFriend.name}</h3>
                <p className="text-sm text-white/70 flex items-center gap-1">
                  {selectedFriend.isOnline && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  )}
                  {selectedFriend.lastSeen}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-transparent to-black/20">
              <div className="space-y-3">
                {/* Sample messages */}
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 ring-2 ring-purple-400/30">
                    <AvatarImage src={selectedFriend.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-red-500 text-white">
                      {selectedFriend.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-2xl rounded-tl-md">
                      <p className="text-sm text-white">Hey! How's your day going?</p>
                    </div>
                    <p className="text-xs text-white/50 mt-1">2h ago</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <div className="flex-1 flex justify-end">
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-3 rounded-2xl rounded-tr-md max-w-[70%] shadow-lg">
                      <p className="text-sm">Great! Just discovered some amazing new tracks 🎵</p>
                    </div>
                  </div>
                </div>

                {selectedFriend.lastMessage.songShared && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 ring-2 ring-purple-400/30">
                      <AvatarImage src={selectedFriend.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-red-500 text-white">
                        {selectedFriend.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-2xl rounded-tl-md">
                        <p className="text-sm mb-2 text-white">{selectedFriend.lastMessage.text}</p>
                        <Card className="bg-gradient-to-r from-purple-500/20 to-red-500/20 border border-purple-400/30 backdrop-blur-sm">
                          <CardContent className="p-3 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                              <Music className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate text-white">
                                {selectedFriend.lastMessage.songShared.title}
                              </p>
                              <p className="text-xs text-white/70 truncate">
                                {selectedFriend.lastMessage.songShared.artist}
                              </p>
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                      <p className="text-xs text-white/50 mt-1">{selectedFriend.lastMessage.time}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-purple-500/20 to-red-500/20">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-purple-400"
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-full w-10 h-10 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Friends List
          <CardContent className="p-0 max-h-[60vh] overflow-y-auto bg-gradient-to-b from-transparent to-black/20">
            <div className="space-y-1">
              {filteredFriends.map((friend, index) => (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 hover:bg-white/10 cursor-pointer transition-all duration-200 border-b border-white/5 last:border-b-0"
                  onClick={() => setSelectedFriend(friend)}
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12 ring-2 ring-purple-400/30">
                      <AvatarImage src={friend.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-red-500 text-white">
                        {friend.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    {friend.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-slate-900 rounded-full animate-pulse" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium truncate text-white">{friend.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/60">
                          {friend.lastMessage.time}
                        </span>
                        {friend.unreadCount > 0 && (
                          <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 w-5 h-5 p-0 text-xs flex items-center justify-center animate-pulse">
                            {friend.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-white/70 truncate">
                      {friend.lastMessage.songShared ? (
                        <span className="flex items-center gap-1">
                          <Music className="w-3 h-3 text-purple-400" />
                          <span className="text-purple-400">Shared a song</span>
                        </span>
                      ) : (
                        friend.lastMessage.text
                      )}
                    </p>
                    <p className="text-xs text-white/50">{friend.username}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredFriends.length === 0 && (
              <div className="text-center py-8">
                <p className="text-white/60">No friends found</p>
              </div>
            )}
          </CardContent>
        )}
      </motion.div>
    </motion.div>
  );
}