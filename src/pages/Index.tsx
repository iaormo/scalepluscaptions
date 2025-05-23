import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });
  const [loginError, setLoginError] = useState("");

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
    setLoginError("");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = login(loginForm.username, loginForm.password);
    
    if (success) {
      toast({
        title: "Login successful!",
        description: "Welcome back to Scale+ Captions.",
      });
      navigate("/dashboard");
    } else {
      setLoginError("Invalid username or password");
      toast({
        title: "Login failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 container max-w-screen-xl mx-auto px-4 py-8 md:py-12">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unlock Your Social Media Potential
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-8">
            Generate engaging captions effortlessly with Scale+ Captions.
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => navigate("/register")}>
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/generator")}>
              Generate Caption
            </Button>
          </div>
        </section>
    
        <div className="mx-auto max-w-sm space-y-4 mt-8">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={loginForm.username}
                onChange={handleLoginChange}
                className={loginError ? "border-destructive" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={handleLoginChange}
                className={loginError ? "border-destructive" : ""}
              />
              {loginError && <p className="text-xs text-destructive">{loginError}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Button
                variant="link"
                onClick={() => navigate("/register")}
                className="p-0 h-auto font-medium"
              >
                Register
              </Button>
            </p>
          </div>
        </div>
      </div>

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
        </div>
      </footer>
    </div>
  );
};

export default Index;
