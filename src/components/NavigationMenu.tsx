
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Home, MessageSquare, Image } from "lucide-react";

interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

const NavigationMenu = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems: NavItem[] = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Generator", icon: MessageSquare, path: "/generator" },
    { name: "Results", icon: Image, path: "/results" }
  ];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => {
        const Icon = item.icon;
        
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`text-sm font-medium transition-colors flex items-center gap-1 ${
              isActive(item.path)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;
