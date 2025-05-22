import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { CaptionResponse } from "@/types";
import SocialShareButtons from "@/components/SocialShareButtons";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [caption, setCaption] = useState<CaptionResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedCaptions, setSavedCaptions] = useState<CaptionResponse[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (location.state?.caption) {
      setCaption(location.state.caption);
    }

    // Get saved captions from localStorage
    const savedData = localStorage.getItem("captions");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as CaptionResponse[];
        setSavedCaptions(parsedData);
        
        // If no caption in state, use the most recent one
        if (!location.state?.caption && parsedData.length > 0) {
          setCaption(parsedData[0]);
        }
      } catch (error) {
        console.error("Error parsing saved captions", error);
      }
    }
    
    // Add a short delay for animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, [location.state]);

  const handleCopyCaption = () => {
    if (!caption) return;
    
    // Create formatted text with caption and hashtags
    const formattedHashtags = caption.hashtags.map(tag => `#${tag}`).join(" ");
    const textToCopy = `${caption.caption}\n\n${formattedHashtags}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Caption and hashtags copied successfully",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch(err => {
      console.error("Failed to copy: ", err);
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    });
  };

  const handleShare = async () => {
    if (!caption) return;

    const shareData = {
      title: "CaptionCraft Generated Caption",
      text: `${caption.caption.substring(0, 50)}...`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully",
          description: "Caption shared with your selected app",
        });
      } catch (err) {
        console.error("Error sharing: ", err);
      }
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support the share functionality",
        variant: "destructive",
      });
    }
  };

  const handleSelectCaption = (selectedCaption: CaptionResponse) => {
    setCaption(selectedCaption);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!caption) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">No caption found</h2>
        <p className="text-muted-foreground mb-6">
          Generate a new caption to see results here.
        </p>
        <Button onClick={() => navigate("/generator")}>
          Create Caption
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/generator")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Create Another Caption
      </Button>

      <div className="space-y-8">
        {/* Current Caption */}
        <Card className={`transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <CardHeader>
            <CardTitle>Your Generated Caption</CardTitle>
            <CardDescription>
              Ready to use on your social media platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-secondary/30 p-6 rounded-lg border relative">
              <div className="prose max-w-none">
                <p className="text-lg whitespace-pre-line">{caption.caption}</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCopyCaption}
                className="absolute top-3 right-3 opacity-70 hover:opacity-100"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Trending Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {caption.hashtags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex flex-col sm:flex-row gap-3 sm:justify-between">
            <div className="text-xs text-muted-foreground">
              Generated on {new Date(caption.createdAt).toLocaleDateString()}
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-initial" 
                onClick={handleCopyCaption}
              >
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? "Copied" : "Copy Caption"}
              </Button>
              
              <SocialShareButtons caption={caption} />
            </div>
          </CardFooter>
        </Card>

        {/* Previous Captions */}
        {savedCaptions.length > 1 && (
          <div className={`space-y-4 transition-all duration-700 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-xl font-bold">Previous Captions</h2>
            <div className="grid gap-4">
              {savedCaptions.slice(caption === savedCaptions[0] ? 1 : 0, 5).map((savedCaption) => (
                <Card 
                  key={savedCaption.id} 
                  className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleSelectCaption(savedCaption)}
                >
                  <CardContent className="p-4">
                    <p className="line-clamp-2 text-sm">
                      {savedCaption.caption}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {savedCaption.hashtags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {savedCaption.hashtags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{savedCaption.hashtags.length - 3} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA for new caption */}
        <div className={`flex justify-center transition-all duration-700 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Button onClick={() => navigate("/generator")} className="btn-hover">
            Generate Another Caption
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
