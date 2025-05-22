
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Wand2 } from "lucide-react";
import { generateCaption } from "@/services/api";
import { CaptionRequest, CaptionResponse, PostPurpose, PostType } from "@/types";

const Generator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { toast } = useToast();
  const queryParams = new URLSearchParams(location.search);
  const preselectedType = queryParams.get("type") as PostType | null;

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("type");
  const [formData, setFormData] = useState<{
    postType: PostType;
    postPurpose: PostPurpose;
    customType: string;
    customPurpose: string;
  }>({
    postType: preselectedType || "promotional",
    postPurpose: "attention",
    customType: "",
    customPurpose: "",
  });

  const [captionResult, setCaptionResult] = useState<CaptionResponse | null>(null);

  useEffect(() => {
    if (preselectedType) {
      setFormData(prev => ({ ...prev, postType: preselectedType }));
    }
  }, [preselectedType]);

  const handleTypeChange = (value: PostType) => {
    setFormData({ ...formData, postType: value });
  };

  const handlePurposeChange = (value: PostPurpose) => {
    setFormData({ ...formData, postPurpose: value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (activeTab === "type") {
      setActiveTab("purpose");
    } else if (activeTab === "purpose") {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (activeTab === "purpose") {
      setActiveTab("type");
    } else if (activeTab === "result" && captionResult) {
      setCaptionResult(null);
      setActiveTab("purpose");
    }
  };

  const handleGenerate = async () => {
    if (!user) return;

    setIsLoading(true);
    
    try {
      const request: CaptionRequest = {
        postType: formData.postType,
        postPurpose: formData.postPurpose,
        customType: formData.customType,
        customPurpose: formData.customPurpose,
        businessType: user.businessType,
        businessDescription: user.businessDescription,
      };
      
      const result = await generateCaption(request);
      setCaptionResult(result);
      
      // Save to local storage
      const savedCaptions = JSON.parse(localStorage.getItem("captions") || "[]");
      localStorage.setItem("captions", JSON.stringify([result, ...savedCaptions]));
      
      toast({
        title: "Caption generated successfully",
        description: "Your caption is ready to use!",
      });
      
      // Navigate to results page
      navigate("/results", { state: { caption: result } });
    } catch (error) {
      console.error("Error generating caption:", error);
      toast({
        title: "Error generating caption",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/dashboard")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle>Create Caption</CardTitle>
          <CardDescription>
            Customize your social media caption options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="type">Post Type</TabsTrigger>
              <TabsTrigger value="purpose">Purpose</TabsTrigger>
            </TabsList>

            <TabsContent value="type" className="animate-fade-in">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>What type of post is this?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { value: "promotional", label: "Promotional", description: "Highlight products, services, or offers" },
                      { value: "inspirational", label: "Inspirational", description: "Motivate and uplift your audience" },
                      { value: "educational", label: "Educational", description: "Share knowledge and expertise" },
                      { value: "conversational", label: "Conversational", description: "Engage with followers casually" },
                      { value: "custom", label: "Custom", description: "Define your own post type" }
                    ].map((type) => (
                      <div
                        key={type.value}
                        className={`border rounded-md p-3 cursor-pointer hover:border-primary transition-colors ${
                          formData.postType === type.value ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        onClick={() => handleTypeChange(type.value as PostType)}
                      >
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {type.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.postType === "custom" && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="customType">Describe your post type</Label>
                    <Input
                      id="customType"
                      name="customType"
                      placeholder="E.g., Behind-the-scenes"
                      value={formData.customType}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <Button onClick={handleNext} className="w-full">
                  Next: Define Purpose
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="purpose" className="animate-fade-in">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>What's the purpose of this caption?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { value: "attention", label: "Attention-Grabbing", description: "Catch your audience's eye" },
                      { value: "sales", label: "Sales-Driven", description: "Convert followers into customers" },
                      { value: "community", label: "Community-Building", description: "Foster connection and loyalty" },
                      { value: "storytelling", label: "Storytelling", description: "Share a narrative or journey" },
                      { value: "custom", label: "Custom", description: "Define your own purpose" }
                    ].map((purpose) => (
                      <div
                        key={purpose.value}
                        className={`border rounded-md p-3 cursor-pointer hover:border-primary transition-colors ${
                          formData.postPurpose === purpose.value ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        onClick={() => handlePurposeChange(purpose.value as PostPurpose)}
                      >
                        <div className="font-medium">{purpose.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {purpose.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {formData.postPurpose === "custom" && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="customPurpose">Describe your purpose</Label>
                    <Input
                      id="customPurpose"
                      name="customPurpose"
                      placeholder="E.g., To showcase customer testimonials"
                      value={formData.customPurpose}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="businessDescription">
                    Additional details (optional)
                  </Label>
                  <Textarea
                    id="businessDescription"
                    placeholder="Add any specific details you want included in the caption..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>Generating...</>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Caption
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{user.businessName}</span> • {user.businessType}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Generator;
