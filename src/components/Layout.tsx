
import { useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { Menu, Home, MessageSquare, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Register service worker for PWA
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("ServiceWorker registered: ", registration);
          })
          .catch((error) => {
            console.log("ServiceWorker registration failed: ", error);
          });
      });
    }
  }, []);

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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Generator", icon: MessageSquare, path: "/generator" },
    { name: "Results", icon: Image, path: "/results" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
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
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </a>
            ))}
          </nav>
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur md:hidden animate-fade-in">
          <div className="container h-full py-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <a href="/dashboard" className="flex items-center gap-2 font-semibold">
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
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
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
                <a
                  key={item.name}
                  href={item.path}
                  className={`text-lg font-medium transition-colors flex items-center gap-3 p-3 rounded-md ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </a>
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
                    onClick={handleLogout}
                    className="w-full"
                  >
                    Log out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-center gap-2 text-center px-4">
          <p className="text-sm text-muted-foreground">
            Proudly created by{" "}
            <a
              href="https://scaleplus.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              scaleplus.io
            </a>
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Scale<sup>+</sup> Caption. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
