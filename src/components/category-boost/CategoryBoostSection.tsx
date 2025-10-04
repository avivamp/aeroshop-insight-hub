import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { RotateCcw, Save, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Category {
  id: string;
  name: string;
  boostWeight: number;
  defaultWeight: number;
}

interface CategoryBoostSectionProps {
  categories: Category[];
  globalBoost: number;
  hasChanges: boolean;
  onCategoryChange: (categoryId: string, value: number[]) => void;
  onGlobalBoostChange: (value: number[]) => void;
  onResetCategory: (categoryId: string) => void;
  onResetAll: () => void;
  onSave: () => void;
}

export default function CategoryBoostSection({
  categories,
  globalBoost,
  hasChanges,
  onCategoryChange,
  onGlobalBoostChange,
  onResetCategory,
  onResetAll,
  onSave,
}: CategoryBoostSectionProps) {
  const getBoostLabel = (weight: number): { label: string; variant: "destructive" | "secondary" | "default" } => {
    if (weight < 0.7) return { label: "Low", variant: "destructive" };
    if (weight > 1.3) return { label: "High", variant: "default" };
    return { label: "Normal", variant: "secondary" };
  };

  return (
    <>
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
              onValueChange={onGlobalBoostChange}
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
              onClick={onResetAll}
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All to Defaults
            </Button>
            <Button
              onClick={onSave}
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
                              onValueChange={(value) => onCategoryChange(category.id, value)}
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
                          onClick={() => onResetCategory(category.id)}
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
    </>
  );
}
