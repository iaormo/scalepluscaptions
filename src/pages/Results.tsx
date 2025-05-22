
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CaptionResponse } from "@/types";
import CaptionCard from "@/components/results/CaptionCard";
import PreviousCaptions from "@/components/results/PreviousCaptions";
import NoCaptionFound from "@/components/results/NoCaptionFound";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [caption, setCaption] = useState<CaptionResponse | null>(null);
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

  const handleSelectCaption = (selectedCaption: CaptionResponse) => {
    setCaption(selectedCaption);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!caption) {
    return <NoCaptionFound />;
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
        <CaptionCard caption={caption} isLoaded={isLoaded} />

        {/* Previous Captions */}
        <PreviousCaptions 
          captions={savedCaptions} 
          currentCaption={caption} 
          onSelect={handleSelectCaption} 
          isLoaded={isLoaded} 
        />
        
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
