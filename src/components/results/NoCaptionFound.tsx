
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NoCaptionFound = () => {
  const navigate = useNavigate();
  
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
};

export default NoCaptionFound;
