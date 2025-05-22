
import { useUser } from "@/context/UserContext";
import { Home, MessageSquare, Image } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AppLogo from "./AppLogo";

interface MobileMenuProps {
  onClose: () => void;
  onLogout: () => void;
}

const MobileMenu = ({ onClose, onLogout }: MobileMenuProps) => {
  const { user } = useUser();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Generator", icon: MessageSquare, path: "/generator" },
    { name: "Results", icon: Image, path: "/results" }
  ];

  return (
    <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur md:hidden animate-fade-in">
      <div className="container h-full py-6 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <AppLogo />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-lg font-medium transition-colors flex items-center gap-3 p-3 rounded-md ${
                isActive(item.path)
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary"
              }`}
              onClick={onClose}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t">
          {user && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.businessName}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="w-full"
              >
                Log out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
