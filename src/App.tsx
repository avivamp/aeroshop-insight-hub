import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import AISearchAnalytics from "./pages/AISearchAnalytics";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route
              path="customers"
              element={<PlaceholderPage title="Customer Insights" description="Analyze customer behavior and trends" />}
            />
            <Route
              path="analytics"
              element={<AISearchAnalytics />}
            />
            <Route
              path="promotions"
              element={<PlaceholderPage title="Promotions & Pricing" description="Manage campaigns and pricing strategies" />}
            />
            <Route
              path="loyalty"
              element={<PlaceholderPage title="Loyalty & Personalization" description="Configure loyalty programs and personalization rules" />}
            />
            <Route
              path="settings"
              element={<PlaceholderPage title="Integrations & Settings" description="Configure integrations and system settings" />}
            />
            <Route
              path="monitoring"
              element={<PlaceholderPage title="Monitoring & Logs" description="View system logs and performance metrics" />}
            />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
