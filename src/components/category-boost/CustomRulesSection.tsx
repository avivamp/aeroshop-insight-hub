import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Copy, Trash2, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import RuleDrawer from "./RuleDrawer";
import { toast } from "@/hooks/use-toast";

interface Rule {
  id: string;
  name: string;
  enabled: boolean;
  scope: { type: "route" | "all"; from?: string; to?: string };
  cabins: string[];
  dateWindow: { start?: string; end?: string; alwaysOn: boolean };
  priority: number;
  targets: any;
  lastUpdated: string;
}

const MOCK_RULES: Rule[] = [
  {
    id: "1",
    name: "Premium Fragrance Boost - Dubai Routes",
    enabled: true,
    scope: { type: "route", from: "DXB", to: "CDG" },
    cabins: ["Business", "First Class"],
    dateWindow: { alwaysOn: true },
    priority: 1,
    targets: { categories: ["Fragrance & Beauty"], boost: 1.8 },
    lastUpdated: "2025-01-10",
  },
  {
    id: "2",
    name: "Electronics Discount Push",
    enabled: true,
    scope: { type: "all" },
    cabins: ["Economy"],
    dateWindow: { start: "2025-01-15", end: "2025-01-31", alwaysOn: false },
    priority: 2,
    targets: { categories: ["Electronics"], boost: 1.5 },
    lastUpdated: "2025-01-08",
  },
  {
    id: "3",
    name: "Seasonal Snacks Promotion",
    enabled: false,
    scope: { type: "route", from: "JFK", to: "LHR" },
    cabins: ["All"],
    dateWindow: { start: "2025-02-01", end: "2025-02-14", alwaysOn: false },
    priority: 3,
    targets: { categories: ["Snacks & Drinks"], boost: 1.6 },
    lastUpdated: "2025-01-05",
  },
];

export default function CustomRulesSection() {
  const [rules, setRules] = useState<Rule[]>(MOCK_RULES);
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);

  const handleToggleRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
    toast({
      title: "Rule Updated",
      description: "Rule status changed successfully.",
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedRules(checked ? rules.map((r) => r.id) : []);
  };

  const handleSelectRule = (ruleId: string, checked: boolean) => {
    setSelectedRules((prev) =>
      checked ? [...prev, ruleId] : prev.filter((id) => id !== ruleId)
    );
  };

  const handleBulkEnable = () => {
    setRules((prev) =>
      prev.map((rule) =>
        selectedRules.includes(rule.id) ? { ...rule, enabled: true } : rule
      )
    );
    toast({ title: "Bulk Action", description: `${selectedRules.length} rules enabled.` });
    setSelectedRules([]);
  };

  const handleBulkDisable = () => {
    setRules((prev) =>
      prev.map((rule) =>
        selectedRules.includes(rule.id) ? { ...rule, enabled: false } : rule
      )
    );
    toast({ title: "Bulk Action", description: `${selectedRules.length} rules disabled.` });
    setSelectedRules([]);
  };

  const handleBulkDelete = () => {
    setRules((prev) => prev.filter((rule) => !selectedRules.includes(rule.id)));
    toast({ title: "Bulk Delete", description: `${selectedRules.length} rules deleted.` });
    setSelectedRules([]);
  };

  const handleCreateRule = () => {
    setEditingRule(null);
    setDrawerOpen(true);
  };

  const handleEditRule = (rule: Rule) => {
    setEditingRule(rule);
    setDrawerOpen(true);
  };

  const handleDuplicateRule = (rule: Rule) => {
    const newRule = { ...rule, id: `${Date.now()}`, name: `${rule.name} (Copy)` };
    setRules((prev) => [...prev, newRule]);
    toast({ title: "Rule Duplicated", description: "Rule copied successfully." });
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules((prev) => prev.filter((rule) => rule.id !== ruleId));
    toast({ title: "Rule Deleted", description: "Rule removed successfully." });
  };

  const handleSaveRule = (rule: Rule) => {
    if (editingRule) {
      setRules((prev) => prev.map((r) => (r.id === rule.id ? rule : r)));
      toast({ title: "Rule Updated", description: "Changes saved successfully." });
    } else {
      setRules((prev) => [...prev, { ...rule, id: `${Date.now()}`, lastUpdated: new Date().toISOString().split("T")[0] }]);
      toast({ title: "Rule Created", description: "New rule added successfully." });
    }
    setDrawerOpen(false);
  };

  const getScopeLabel = (rule: Rule) => {
    if (rule.scope.type === "all") return "All Routes";
    return `${rule.scope.from} → ${rule.scope.to}`;
  };

  const getCabinLabel = (cabins: string[]) => {
    if (cabins.includes("All")) return "All Cabins";
    return cabins.join(", ");
  };

  const getDateLabel = (dateWindow: Rule["dateWindow"]) => {
    if (dateWindow.alwaysOn) return "Always On";
    return `${dateWindow.start} to ${dateWindow.end}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Custom Ranking Rules</CardTitle>
              <CardDescription>
                Create advanced rules to control product ranking by route, cabin, and schedule
              </CardDescription>
            </div>
            <Button onClick={handleCreateRule}>
              <Plus className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedRules.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">{selectedRules.length} selected</span>
              <div className="flex gap-2 ml-auto">
                <Button size="sm" variant="outline" onClick={handleBulkEnable}>
                  Enable
                </Button>
                <Button size="sm" variant="outline" onClick={handleBulkDisable}>
                  Disable
                </Button>
                <Button size="sm" variant="destructive" onClick={handleBulkDelete}>
                  Delete
                </Button>
              </div>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedRules.length === rules.length && rules.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[60px]">Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Scope</TableHead>
                  <TableHead>Cabin</TableHead>
                  <TableHead>Date Window</TableHead>
                  <TableHead className="w-[80px]">Priority</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedRules.includes(rule.id)}
                        onCheckedChange={(checked) => handleSelectRule(rule.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => handleToggleRule(rule.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{getScopeLabel(rule)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{getCabinLabel(rule.cabins)}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {getDateLabel(rule.dateWindow)}
                    </TableCell>
                    <TableCell>
                      <Badge>{rule.priority}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {rule.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover z-50">
                          <DropdownMenuItem onClick={() => handleEditRule(rule)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateRule(rule)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteRule(rule.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <RuleDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        rule={editingRule}
        onSave={handleSaveRule}
      />
    </div>
  );
}
