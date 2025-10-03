import { Music, BarChart3, User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Music className="w-8 h-8 text-red-500" />
              <div>
                <h1 className="text-xl font-bold text-red-500">YouTube Music</h1>
                <Badge variant="secondary" className="text-xs">Analytics Dashboard</Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}