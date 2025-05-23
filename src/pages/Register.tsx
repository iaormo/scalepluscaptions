
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";

const businessTypes = [
  "E-commerce",
  "Service-based",
  "Coaching",
  "Consulting",
  "Real Estate",
  "Health & Wellness",
  "Food & Beverage",
  "Tech & SaaS",
  "Fashion & Beauty",
  "Education",
  "Travel",
  "Fitness",
  "Creative Agency",
  "Entertainment",
  "Financial Services",
  "Other",
];

const Register = () => {
  const navigate = useNavigate();
  const { register } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    customBusinessType: "",
    businessDescription: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    businessDescription: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, businessType: value });
    setErrors({ ...errors, businessType: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (!formData.phone || formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid phone number";
      valid = false;
    }

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!formData.businessName) {
      newErrors.businessName = "Business name is required";
      valid = false;
    }

    if (!formData.businessType) {
      newErrors.businessType = "Please select a business type";
      valid = false;
    }

    if (!formData.businessDescription || formData.businessDescription.length < 20) {
      newErrors.businessDescription = "Please provide a description (20+ characters)";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      
      try {
        const finalBusinessType = formData.businessType === "Other" && formData.customBusinessType
          ? formData.customBusinessType
          : formData.businessType;

        const success = await register(
          formData.email,
          formData.phone,
          formData.username,
          formData.password,
          formData.businessName,
          finalBusinessType,
          formData.businessDescription
        );

        if (success) {
          toast({
            title: "Registration successful!",
            description: "Welcome to Scale+ Captions. Let's create some great captions!",
          });
          navigate("/dashboard");
        } else {
          toast({
            title: "Registration failed",
            description: "Username already exists. Please choose a different one.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast({
          title: "Registration failed",
          description: "An error occurred during registration. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 container max-w-md mx-auto flex flex-col justify-center py-12 px-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/")} 
          className="w-fit mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-muted-foreground">
            Get started with Scale+ Captions to create engaging social media captions
          </p>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-6 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "border-destructive" : ""}
              />
              {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "border-destructive" : ""}
              />
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Business name</Label>
              <Input
                id="businessName"
                name="businessName"
                placeholder="Your Business Name"
                value={formData.businessName}
                onChange={handleChange}
                className={errors.businessName ? "border-destructive" : ""}
              />
              {errors.businessName && <p className="text-xs text-destructive">{errors.businessName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business type</Label>
              <Select
                value={formData.businessType}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className={errors.businessType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.businessType && <p className="text-xs text-destructive">{errors.businessType}</p>}
            </div>

            {formData.businessType === "Other" && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="customBusinessType">Specify your business type</Label>
                <Input
                  id="customBusinessType"
                  name="customBusinessType"
                  placeholder="E.g., Pet Photography"
                  value={formData.customBusinessType}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="businessDescription">
                Tell us about your business
              </Label>
              <Textarea
                id="businessDescription"
                name="businessDescription"
                placeholder="Describe your products, services, target audience, and brand voice..."
                rows={4}
                value={formData.businessDescription}
                onChange={handleChange}
                className={errors.businessDescription ? "border-destructive" : ""}
              />
              {errors.businessDescription && <p className="text-xs text-destructive">{errors.businessDescription}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
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

export default Register;
