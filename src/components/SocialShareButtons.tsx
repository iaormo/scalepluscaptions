
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Facebook, 
  Instagram, 
  Share, 
  Link2 
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { CaptionResponse } from "@/types";

interface SocialShareButtonsProps {
  caption: CaptionResponse;
}

const SocialShareButtons = ({ caption }: SocialShareButtonsProps) => {
  const { toast } = useToast();
  const [linkCopied, setLinkCopied] = useState(false);
  
  // Prepare the caption text with hashtags
  const formattedHashtags = caption.hashtags.map(tag => `#${tag}`).join(" ");
  const textToShare = `${caption.caption}\n\n${formattedHashtags}`;
  
  // Function to share on Facebook
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(textToShare)}`;
    window.open(url, '_blank', 'width=600,height=400');
    toast({
      title: "Opening Facebook sharing",
      description: "Share your caption on Facebook",
    });
  };
  
  // Function to share on Instagram (opens a guide as direct sharing is limited)
  const shareOnInstagram = () => {
    // Instagram doesn't have a direct web share API like Facebook
    // We'll show instructions in a popover
    toast({
      title: "Instagram sharing",
      description: "Your caption has been copied. Open Instagram and paste in your new post.",
    });
    navigator.clipboard.writeText(textToShare);
  };
  
  // Function to copy as link
  const copyAsLink = () => {
    navigator.clipboard.writeText(textToShare);
    setLinkCopied(true);
    toast({
      title: "Caption copied!",
      description: "Your caption has been copied to clipboard",
    });
    
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };
  
  // Function for native share if available
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out my caption!",
          text: textToShare,
          url: window.location.href,
        });
        toast({
          title: "Shared successfully",
          description: "Your caption has been shared",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support direct sharing",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1 bg-[#1877F2] text-white hover:bg-[#166FE5] hover:text-white border-none"
        onClick={shareOnFacebook}
      >
        <Facebook className="h-4 w-4" />
        <span className="hidden sm:inline">Facebook</span>
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90 hover:text-white border-none"
            onClick={shareOnInstagram}
          >
            <Instagram className="h-4 w-4" />
            <span className="hidden sm:inline">Instagram</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-2">
            <h4 className="font-medium">Share to Instagram</h4>
            <p className="text-sm text-muted-foreground">
              Your caption has been copied to clipboard. Open the Instagram app, create a new post, and paste your caption.
            </p>
          </div>
        </PopoverContent>
      </Popover>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1" 
        onClick={copyAsLink}
      >
        <Link2 className={`h-4 w-4 ${linkCopied ? "text-green-500" : ""}`} />
        <span className="hidden sm:inline">{linkCopied ? "Copied!" : "Copy Text"}</span>
      </Button>
      
      <Button 
        variant="default" 
        size="sm" 
        className="flex items-center gap-1" 
        onClick={nativeShare}
      >
        <Share className="h-4 w-4" />
        <span className="hidden sm:inline">Share</span>
      </Button>
    </div>
  );
};

export default SocialShareButtons;
