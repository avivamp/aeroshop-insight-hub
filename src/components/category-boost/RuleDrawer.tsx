import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

const CABIN_CLASSES = ["Economy", "Premium Economy", "Business", "First Class"];

const CATEGORIES = [
  "Fragrance & Beauty",
  "Electronics",
  "Baby & Kids",
  "Snacks & Drinks",
  "Accessories",
  "Fashion & Apparel",
  "Watches & Jewelry",
  "Travel Essentials",
];

interface Rule {
  id?: string;
  name: string;
  enabled: boolean;
  scope: { type: "route" | "all"; from?: string; to?: string };
  cabins: string[];
  dateWindow: { start?: string; end?: string; alwaysOn: boolean };
  priority: number;
  targets: any;
  lastUpdated?: string;
}

interface RuleDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rule: Rule | null;
  onSave: (rule: Rule) => void;
}

export default function RuleDrawer({ open, onOpenChange, rule, onSave }: RuleDrawerProps) {
  const [formData, setFormData] = useState<Rule>({
    name: "",
    enabled: true,
    scope: { type: "all" },
    cabins: [],
    dateWindow: { alwaysOn: true },
    priority: 5,
    targets: { categoryBoosts: {} },
  });

  const [categoryBoosts, setCategoryBoosts] = useState<Record<string, number>>({});
  const [pricePreference, setPricePreference] = useState<"none" | "lower" | "higher">("none");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {
    if (rule) {
      setFormData(rule);
      setCategoryBoosts(rule.targets?.categoryBoosts || {});
    } else {
      setFormData({
        name: "",
        enabled: true,
        scope: { type: "all" },
        cabins: [],
        dateWindow: { alwaysOn: true },
        priority: 5,
        targets: { categoryBoosts: {} },
      });
      setCategoryBoosts({});
      setStartDate(undefined);
      setEndDate(undefined);
    }
  }, [rule, open]);

  const handleSave = () => {
    const updatedRule: Rule = {
      ...formData,
      dateWindow: {
        ...formData.dateWindow,
        start: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
        end: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
      },
      targets: { categoryBoosts, pricePreference },
    };
    onSave(updatedRule);
  };

  const toggleCabin = (cabin: string) => {
    setFormData((prev) => ({
      ...prev,
      cabins: prev.cabins.includes(cabin)
        ? prev.cabins.filter((c) => c !== cabin)
        : [...prev.cabins, cabin],
    }));
  };

  const handleCategoryBoostChange = (category: string, value: number[]) => {
    setCategoryBoosts((prev) => ({ ...prev, [category]: value[0] }));
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>{rule ? "Edit Rule" : "Create New Rule"}</DrawerTitle>
          <DrawerDescription>
            Configure routing, scheduling, and ranking targets for this rule
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 space-y-6 pb-6">
          {/* Rule Name */}
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input
              id="rule-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Premium Fragrance Boost - Dubai Routes"
            />
          </div>

          <Separator />

          {/* Scope */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Scope</Label>
            <div className="flex items-center gap-4">
              <Button
                variant={formData.scope.type === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFormData({ ...formData, scope: { type: "all" } })}
              >
                All Routes
              </Button>
              <Button
                variant={formData.scope.type === "route" ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setFormData({ ...formData, scope: { type: "route", from: "DXB", to: "CDG" } })
                }
              >
                Specific Route
              </Button>
            </div>

            {formData.scope.type === "route" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From (Origin)</Label>
                  <Select
                    value={formData.scope.from}
                    onValueChange={(value) =>
                      setFormData({ ...formData, scope: { ...formData.scope, from: value } })
                    }
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {AIRPORTS.map((airport) => (
                        <SelectItem key={airport.code} value={airport.code}>
                          {airport.code} - {airport.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>To (Destination)</Label>
                  <Select
                    value={formData.scope.to}
                    onValueChange={(value) =>
                      setFormData({ ...formData, scope: { ...formData.scope, to: value } })
                    }
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      {AIRPORTS.map((airport) => (
                        <SelectItem key={airport.code} value={airport.code}>
                          {airport.code} - {airport.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Cabin Filter */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Cabin Classes</Label>
            <div className="flex flex-wrap gap-2">
              {CABIN_CLASSES.map((cabin) => (
                <Badge
                  key={cabin}
                  variant={formData.cabins.includes(cabin) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleCabin(cabin)}
                >
                  {cabin}
                  {formData.cabins.includes(cabin) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Schedule */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Schedule</Label>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.dateWindow.alwaysOn}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    dateWindow: { ...formData.dateWindow, alwaysOn: checked },
                  })
                }
              />
              <Label>Always On</Label>
            </div>

            {!formData.dateWindow.alwaysOn && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover z-50">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover z-50">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Category Boosts */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Category Boosts</Label>
            <div className="space-y-3">
              {CATEGORIES.map((category) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">{category}</Label>
                    <span className="text-sm font-semibold text-primary">
                      {(categoryBoosts[category] || 1.0).toFixed(1)}x
                    </span>
                  </div>
                  <Slider
                    value={[categoryBoosts[category] || 1.0]}
                    onValueChange={(value) => handleCategoryBoostChange(category, value)}
                    min={0}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Preference */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Price Preference</Label>
            <div className="flex gap-2">
              <Button
                variant={pricePreference === "none" ? "default" : "outline"}
                size="sm"
                onClick={() => setPricePreference("none")}
              >
                No Bias
              </Button>
              <Button
                variant={pricePreference === "lower" ? "default" : "outline"}
                size="sm"
                onClick={() => setPricePreference("lower")}
              >
                Favor Lower Price
              </Button>
              <Button
                variant={pricePreference === "higher" ? "default" : "outline"}
                size="sm"
                onClick={() => setPricePreference("higher")}
              >
                Favor Higher Price
              </Button>
            </div>
          </div>

          <Separator />

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority (1 = Highest)</Label>
            <Input
              id="priority"
              type="number"
              min="1"
              max="10"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: parseInt(e.target.value) || 1 })
              }
            />
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={handleSave}>Save Rule</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
