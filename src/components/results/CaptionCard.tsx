
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CaptionResponse } from "@/types";
import SocialShareButtons from "@/components/SocialShareButtons";

interface CaptionCardProps {
  caption: CaptionResponse;
  isLoaded: boolean;
}

const CaptionCard = ({ caption, isLoaded }: CaptionCardProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

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

  return (
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
  );
};

export default CaptionCard;
