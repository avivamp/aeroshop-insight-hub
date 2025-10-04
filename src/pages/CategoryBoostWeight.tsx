import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Sparkles, RotateCcw, Save, TrendingUp, Info, Plane, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
    
    // Apply proportional change to all categories
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
    // Mock API call
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plane className="h-5 w-5 text-accent" />
              Route Preview
            </CardTitle>
            <CardDescription>
              Preview how boosts apply for specific flight routes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <div className="pt-2 px-3 py-2 bg-accent/10 rounded-md">
              <p className="text-sm text-foreground font-medium">
                Current Route: <span className="text-accent">{originAirport} → {destinationAirport}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cabin Class Toggle */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cabin Class Targeting</CardTitle>
            <CardDescription>
              Apply different boost weights by cabin class
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                
                <div className="mt-3 p-3 bg-primary/10 rounded-md border border-primary/20">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">Active for:</span>{" "}
                    <Badge variant="default" className="ml-1">
                      {selectedCabinClass}
                    </Badge>
                  </p>
                </div>
              </div>
            )}

            {!applyCabinClass && (
              <div className="p-3 bg-muted/50 rounded-md border">
                <p className="text-sm text-muted-foreground">
                  Boost weights will apply to all cabin classes uniformly
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Global Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-accent" />
            Bulk Adjustment Controls
          </CardTitle>
          <CardDescription>
            Apply uniform boost weight across all categories or reset to defaults
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">
                Set All Boosts
              </label>
              <span className="text-sm font-semibold text-primary">
                {globalBoost.toFixed(1)}x
              </span>
            </div>
            <Slider
              value={[globalBoost]}
              onValueChange={handleGlobalBoostChange}
              min={0}
              max={2}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.0x (Suppress)</span>
              <span>1.0x (Default)</span>
              <span>2.0x (Maximum)</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleResetAll}
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All to Defaults
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges}
              className="flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Weight Table */}
      <Card>
        <CardHeader>
          <CardTitle>Category Boost Configuration</CardTitle>
          <CardDescription>
            Adjust individual category weights to influence AI product rankings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Category</TableHead>
                  <TableHead>Boost Weight</TableHead>
                  <TableHead className="w-[100px] text-center">Status</TableHead>
                  <TableHead className="w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => {
                  const { label, variant } = getBoostLabel(category.boostWeight);
                  return (
                    <TableRow key={category.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium text-foreground">
                        {category.name}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-3 max-w-md">
                          <div className="flex items-center justify-between">
                            <Slider
                              value={[category.boostWeight]}
                              onValueChange={(value) =>
                                handleSliderChange(category.id, value)
                              }
                              min={0}
                              max={2}
                              step={0.1}
                              className="flex-1"
                            />
                            <span className="ml-4 text-sm font-semibold text-primary min-w-[3rem] text-right">
                              {category.boostWeight.toFixed(1)}x
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={variant} className="min-w-[4rem]">
                          {label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResetCategory(category.id)}
                          disabled={category.boostWeight === category.defaultWeight}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-accent mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">How Boost Weights Work</p>
              <p className="text-sm text-muted-foreground">
                Boost weights influence the AI ranking algorithm. A value of <strong>1.0</strong> is neutral, 
                above <strong>1.3</strong> increases visibility, and below <strong>0.7</strong> reduces it. 
                Changes take effect immediately after saving.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
