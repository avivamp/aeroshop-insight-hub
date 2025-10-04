import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Sparkles, TrendingUp, Plane, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import CategoryBoostSection from "@/components/category-boost/CategoryBoostSection";
import CustomRulesSection from "@/components/category-boost/CustomRulesSection";

interface Category {
  id: string;
  name: string;
  boostWeight: number;
  defaultWeight: number;
}

const MOCK_CATEGORIES: Category[] = [
  { id: "1", name: "Fragrance & Beauty", boostWeight: 1.0, defaultWeight: 1.0 },
  { id: "2", name: "Electronics", boostWeight: 1.0, defaultWeight: 1.0 },
  { id: "3", name: "Baby & Kids", boostWeight: 1.0, defaultWeight: 1.0 },
  { id: "4", name: "Snacks & Drinks", boostWeight: 1.0, defaultWeight: 1.0 },
  { id: "5", name: "Accessories", boostWeight: 1.0, defaultWeight: 1.0 },
  { id: "6", name: "Fashion & Apparel", boostWeight: 1.0, defaultWeight: 1.0 },
  { id: "7", name: "Watches & Jewelry", boostWeight: 1.0, defaultWeight: 1.0 },
  { id: "8", name: "Travel Essentials", boostWeight: 1.0, defaultWeight: 1.0 },
];

const MERCHANT_INFO = {
  name: "Emirates Duty Free",
  id: "EDU-12345",
};

const AIRPORTS = [
  { code: "DXB", name: "Dubai International" },
  { code: "JFK", name: "New York JFK" },
  { code: "LHR", name: "London Heathrow" },
  { code: "CDG", name: "Paris Charles de Gaulle" },
  { code: "SIN", name: "Singapore Changi" },
  { code: "HND", name: "Tokyo Haneda" },
  { code: "SYD", name: "Sydney" },
  { code: "LAX", name: "Los Angeles" },
];

const CABIN_CLASSES = ["Economy", "Business", "First Class"];

export default function CategoryBoostWeight() {
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [globalBoost, setGlobalBoost] = useState<number>(1.0);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Cabin class and route settings
  const [applyCabinClass, setApplyCabinClass] = useState(false);
  const [selectedCabinClass, setSelectedCabinClass] = useState("Economy");
  const [originAirport, setOriginAirport] = useState("DXB");
  const [destinationAirport, setDestinationAirport] = useState("CDG");

  const getBoostLabel = (weight: number): { label: string; variant: "destructive" | "secondary" | "default" } => {
    if (weight < 0.7) return { label: "Low", variant: "destructive" };
    if (weight > 1.3) return { label: "High", variant: "default" };
    return { label: "Normal", variant: "secondary" };
  };

  const handleSliderChange = (categoryId: string, value: number[]) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, boostWeight: value[0] } : cat
      )
    );
    setHasChanges(true);
  };

  const handleGlobalBoostChange = (value: number[]) => {
    const newGlobal = value[0];
    setGlobalBoost(newGlobal);
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        boostWeight: Math.min(2.0, Math.max(0.0, newGlobal)),
      }))
    );
    setHasChanges(true);
  };

  const handleResetCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, boostWeight: cat.defaultWeight } : cat
      )
    );
    setHasChanges(true);
    toast({
      title: "Reset Complete",
      description: "Category boost weight reset to default.",
    });
  };

  const handleResetAll = () => {
    setCategories((prev) =>
      prev.map((cat) => ({ ...cat, boostWeight: cat.defaultWeight }))
    );
    setGlobalBoost(1.0);
    setHasChanges(false);
    toast({
      title: "All Weights Reset",
      description: "All category boost weights reset to defaults.",
    });
  };

  const handleSave = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const contextInfo = applyCabinClass 
      ? `for ${selectedCabinClass} on ${originAirport} → ${destinationAirport}`
      : `for all cabin classes`;
    toast({
      title: "Weights Saved Successfully",
      description: `Updated boost weights ${contextInfo}`,
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Category Boost Weight</h1>
        </div>
        <p className="text-muted-foreground">
          Configure AI-powered product ranking priorities by category
        </p>
      </div>

      {/* Merchant Context */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Merchant</p>
              <p className="text-xl font-semibold text-foreground">{MERCHANT_INFO.name}</p>
              <p className="text-sm text-muted-foreground">ID: {MERCHANT_INFO.id}</p>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route and Cabin Class Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Route Selector */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Plane className="h-5 w-5 text-accent" />
              <h3 className="font-semibold">Route Preview</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label htmlFor="origin" className="text-sm font-medium mb-2 block">
                  Origin
                </Label>
                <Select value={originAirport} onValueChange={setOriginAirport}>
                  <SelectTrigger id="origin" className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {AIRPORTS.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{airport.code}</span>
                          <span className="text-muted-foreground">- {airport.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <ArrowRight className="h-5 w-5 text-muted-foreground mt-6" />
              
              <div className="flex-1">
                <Label htmlFor="destination" className="text-sm font-medium mb-2 block">
                  Destination
                </Label>
                <Select value={destinationAirport} onValueChange={setDestinationAirport}>
                  <SelectTrigger id="destination" className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {AIRPORTS.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{airport.code}</span>
                          <span className="text-muted-foreground">- {airport.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cabin Class Toggle */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-semibold">Cabin Class Targeting</h3>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
              <Label htmlFor="cabin-toggle" className="text-sm font-medium cursor-pointer">
                Enable Cabin Class Filters
              </Label>
              <Switch
                id="cabin-toggle"
                checked={applyCabinClass}
                onCheckedChange={setApplyCabinClass}
              />
            </div>

            {applyCabinClass && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="cabin-class" className="text-sm font-medium">
                  Select Cabin Class
                </Label>
                <Select value={selectedCabinClass} onValueChange={setSelectedCabinClass}>
                  <SelectTrigger id="cabin-class" className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    {CABIN_CLASSES.map((cabinClass) => (
                      <SelectItem key={cabinClass} value={cabinClass}>
                        {cabinClass}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Category Boost Section */}
      <CategoryBoostSection
        categories={categories}
        globalBoost={globalBoost}
        hasChanges={hasChanges}
        onCategoryChange={handleSliderChange}
        onGlobalBoostChange={handleGlobalBoostChange}
        onResetCategory={handleResetCategory}
        onResetAll={handleResetAll}
        onSave={handleSave}
      />

      <Separator className="my-8" />

      {/* Custom Rules Section */}
      <CustomRulesSection />
    </div>
  );
}
