import { DollarSign, ShoppingBag, TrendingUp, RefreshCw, Bot, BarChart3 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const salesData = [
  { name: "Mon", sales: 4200, orders: 24 },
  { name: "Tue", sales: 5800, orders: 32 },
  { name: "Wed", sales: 4600, orders: 28 },
  { name: "Thu", sales: 6900, orders: 38 },
  { name: "Fri", sales: 7400, orders: 42 },
  { name: "Sat", sales: 8100, orders: 48 },
  { name: "Sun", sales: 7200, orders: 45 },
];

const topProducts = [
  { name: "Chanel No. 5", sales: 45, revenue: "$12,450", image: "💄", stock: "In Stock" },
  { name: "Dior Sauvage", sales: 38, revenue: "$9,880", image: "🧴", stock: "In Stock" },
  { name: "MacBook Air", sales: 12, revenue: "$14,988", image: "💻", stock: "Low Stock" },
  { name: "Swiss Chocolate", sales: 67, revenue: "$3,350", image: "🍫", stock: "In Stock" },
  { name: "Duty-Free Whisky", sales: 29, revenue: "$8,700", image: "🥃", stock: "In Stock" },
];

const categoryData = [
  { name: "Perfumes", value: 35, color: "#3b82f6" },
  { name: "Electronics", value: 25, color: "#8b5cf6" },
  { name: "Food & Beverage", value: 20, color: "#10b981" },
  { name: "Fashion", value: 12, color: "#f59e0b" },
  { name: "Other", value: 8, color: "#6b7280" },
];

const conversionFunnel = [
  { stage: "AI Recommendation", users: 1000, percentage: 100 },
  { stage: "Product Clicked", users: 650, percentage: 65 },
  { stage: "Added to Cart", users: 420, percentage: 42 },
  { stage: "Purchase", users: 285, percentage: 28.5 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Sales"
          value="$48,234"
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-success"
        />
        <StatCard
          title="Orders"
          value="257"
          change="+8.2%"
          changeType="positive"
          icon={ShoppingBag}
          iconColor="bg-primary"
        />
        <StatCard
          title="Avg Order Value"
          value="$187.54"
          change="+4.1%"
          changeType="positive"
          icon={TrendingUp}
          iconColor="bg-accent"
        />
        <StatCard
          title="Refund Rate"
          value="2.3%"
          change="-0.5%"
          changeType="positive"
          icon={RefreshCw}
          iconColor="bg-warning"
        />
        <StatCard
          title="AI Queries Served"
          value="3,842"
          change="+15.8%"
          changeType="positive"
          icon={Bot}
          iconColor="bg-primary"
        />
        <StatCard
          title="Conversion Rate"
          value="28.5%"
          change="+3.2%"
          changeType="positive"
          icon={BarChart3}
          iconColor="bg-success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>AI Recommendation Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionFunnel} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="stage" type="category" stroke="#6b7280" width={150} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="users" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{product.image}</div>
                  <div>
                    <h4 className="font-semibold text-foreground">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{product.revenue}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.stock === "In Stock"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {product.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
