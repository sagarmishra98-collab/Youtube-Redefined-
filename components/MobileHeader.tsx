import { Music, Users, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MessagesModal } from "./MessagesModal";
import { useState } from "react";

interface MobileHeaderProps {
  title: string;
  showSocial?: boolean;
}

export function MobileHeader({ title, showSocial = true }: MobileHeaderProps) {
  const [showMessages, setShowMessages] = useState(false);
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Music className="w-6 h-6 text-red-500" />
          <div>
            <h1 className="text-lg font-bold text-red-500">YouTube Music</h1>
            <p className="text-xs text-muted-foreground">{title}</p>
          </div>
        </div>
        
        {showSocial && (
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => setShowMessages(true)}
            >
              <Users className="w-5 h-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-4 h-4 p-0 text-xs flex items-center justify-center"
              >
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://images.unsplash.com/photo-1704018453307-d563498b585b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzb2NpYWwlMjBtZWRpYSUyMGljb25zJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzU5NDk1NjcyfDA&ixlib=rb-4.1.0&q=80&w=100" />
              <AvatarFallback>YM</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
      
      <MessagesModal 
        isOpen={showMessages} 
        onClose={() => setShowMessages(false)} 
      />
    </header>
  );
}