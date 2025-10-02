import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Search,
  Tag,
  Gift,
  Settings,
  Activity,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Package, label: "Products & Catalog", path: "/products" },
  { icon: ShoppingCart, label: "Orders & Fulfillment", path: "/orders" },
  { icon: Users, label: "Customer Insights", path: "/customers" },
  { icon: Search, label: "AI & Search Analytics", path: "/analytics" },
  { icon: Tag, label: "Promotions & Pricing", path: "/promotions" },
  { icon: Gift, label: "Loyalty & Personalization", path: "/loyalty" },
  { icon: Settings, label: "Integrations & Settings", path: "/settings" },
  { icon: Activity, label: "Monitoring & Logs", path: "/monitoring" },
];

export function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside
      className={cn(
        "border-r border-sidebar-border bg-sidebar transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Plane className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-base text-sidebar-foreground">Aeroshop</h1>
              <p className="text-xs text-muted-foreground">Merchant Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    "hover:bg-sidebar-accent text-sidebar-foreground",
                    isActive && "bg-sidebar-accent text-sidebar-primary font-medium"
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="text-sm">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
