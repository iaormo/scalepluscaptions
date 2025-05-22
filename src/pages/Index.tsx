
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  // Trigger animation after component mount
  useState(() => {
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  });

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center py-12 px-4 md:py-24">
        <div className={`container max-w-5xl space-y-8 text-center transition-all duration-700 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Craft Perfect Social Media Captions
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Create engaging, personalized captions for your business with AI. Save time and increase engagement.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => navigate("/register")} size="lg" className="btn-hover">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 px-4 md:py-24 bg-secondary/50">
        <div className="container max-w-5xl space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Supercharge Your Social Media
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              Our AI-powered caption generator creates perfect captions tailored to your business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Tailored to Your Business",
                description: "Captions unique to your business type and brand voice.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mb-4 text-primary">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                )
              },
              {
                title: "Multiple Caption Types",
                description: "Promotional, inspirational, educational, and conversational options.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mb-4 text-primary">
                    <path d="M17 10h4V2H3v8h4"></path>
                    <path d="M7 10v11h10V10"></path>
                  </svg>
                )
              },
              {
                title: "Trending Hashtags",
                description: "Each caption comes with curated trending hashtags for maximum reach.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mb-4 text-primary">
                    <path d="M4 9h16"></path>
                    <path d="M4 15h16"></path>
                    <path d="M10 3v18"></path>
                    <path d="M14 3v18"></path>
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className={`p-6 rounded-lg bg-card shadow-sm card-hover transition-all duration-700 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                {feature.icon}
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 md:py-24">
        <div className="container max-w-5xl">
          <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 md:p-12 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Ready to Transform Your Social Media?
              </h2>
              <p className="text-muted-foreground md:text-lg max-w-[600px]">
                Join thousands of businesses creating engaging content with our AI caption generator.
              </p>
              <Button onClick={() => navigate("/register")} size="lg" className="mt-4 btn-hover">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

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
            © {new Date().getFullYear()} CaptionCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
