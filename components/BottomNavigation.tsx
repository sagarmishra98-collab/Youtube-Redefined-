import { Home, Search, Library, BarChart3, User } from "lucide-react";
import { Button } from "./ui/button";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "library", icon: Library, label: "Library" },
    { id: "analytics", icon: BarChart3, label: "Stats" },
    { id: "premium", icon: User, label: "Premium" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
              activeTab === tab.id 
                ? "text-red-500" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-xs">{tab.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}