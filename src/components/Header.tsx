
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <AppLogo />
          </div>
          <NavigationMenu />
          <div className="flex items-center gap-2">
            {user && (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {user.businessName}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </div>
            )}
            <Button onClick={() => navigate("/generator")} size="sm" className="hidden sm:flex">
              Create Caption
            </Button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <MobileMenu 
          onClose={toggleMobileMenu} 
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

const AppLogo = () => {
  return (
    <a
      href="/dashboard"
      className="flex items-center gap-2 font-semibold"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9333ea"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 5v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
        <path d="M12 13V7" />
        <path d="M9 10h6" />
        <path d="M9 17h6" />
      </svg>
      <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Scale<sup>+</sup> Caption
      </span>
    </a>
  );
};

const NavigationMenu = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Dashboard", icon: "Home", path: "/dashboard" },
    { name: "Generator", icon: "MessageSquare", path: "/generator" },
    { name: "Results", icon: "Image", path: "/results" }
  ];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map((item) => {
        // Dynamically import the icon
        const Icon = require("lucide-react")[item.icon];
        
        return (
          <a
            key={item.name}
            href={item.path}
            className={`text-sm font-medium transition-colors flex items-center gap-1 ${
              isActive(item.path)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </a>
        );
      })}
    </nav>
  );
};

export default Header;
