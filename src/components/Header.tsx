
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MobileMenu from "./MobileMenu";
import AppLogo from "./AppLogo";
import NavigationMenu from "./NavigationMenu";

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

export default Header;
