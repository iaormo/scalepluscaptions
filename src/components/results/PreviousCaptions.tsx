
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CaptionResponse } from "@/types";

interface PreviousCaptionsProps {
  captions: CaptionResponse[];
  currentCaption: CaptionResponse | null;
  onSelect: (caption: CaptionResponse) => void;
  isLoaded: boolean;
}

const PreviousCaptions = ({ captions, currentCaption, onSelect, isLoaded }: PreviousCaptionsProps) => {
  if (captions.length <= 1) {
    return null;
  }

  return (
    <div className={`space-y-4 transition-all duration-700 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <h2 className="text-xl font-bold">Previous Captions</h2>
      <div className="grid gap-4">
        {captions
          .slice(currentCaption === captions[0] ? 1 : 0, 5)
          .map((savedCaption) => (
            <Card 
              key={savedCaption.id} 
              className="overflow-hidden cursor-pointer hover:border-primary transition-colors"
              onClick={() => onSelect(savedCaption)}
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
  );
};

export default PreviousCaptions;
