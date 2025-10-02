import { DollarSign, ShoppingBag, TrendingUp, RefreshCw, Bot, BarChart3, Search, Clock, MousePointer, Globe, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, FunnelChart, Funnel, LabelList } from "recharts";

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

// AI & Search Performance Data
const searchFunnel = [
  { name: "Queries", value: 10000, fill: "#3b82f6" },
  { name: "Results Shown", value: 8500, fill: "#8b5cf6" },
  { name: "Clicks", value: 1800, fill: "#10b981" },
  { name: "Purchases", value: 350, fill: "#f59e0b" },
];

const ctrByPosition = [
  { position: "1st", ctr: 34 },
  { position: "2nd", ctr: 18 },
  { position: "3rd", ctr: 12 },
  { position: "4th+", ctr: 6 },
];

const recommendationCtrTrend = [
  { day: "Mon", ctr: 17.2 },
  { day: "Tue", ctr: 18.5 },
  { day: "Wed", ctr: 19.1 },
  { day: "Thu", ctr: 18.8 },
  { day: "Fri", ctr: 17.6 },
  { day: "Sat", ctr: 18.9 },
  { day: "Sun", ctr: 18.4 },
];

const personalizationImpact = [
  { metric: "CTR", without: 12.5, with: 18.4 },
  { metric: "Conversion", without: 2.1, with: 3.8 },
  { metric: "AOV", without: 165, with: 195 },
];

const topSearchQueries = [
  { query: "perfume women", impressions: 1243, ctr: 24.5, purchases: 89, revenue: "$8,450" },
  { query: "chocolate swiss", impressions: 987, ctr: 31.2, purchases: 112, revenue: "$5,600" },
  { query: "laptop", impressions: 856, ctr: 18.3, purchases: 34, revenue: "$42,500" },
  { query: "whiskey duty free", impressions: 745, ctr: 28.9, purchases: 67, revenue: "$20,100" },
  { query: "sunglasses", impressions: 623, ctr: 15.7, purchases: 28, revenue: "$4,200" },
];

const failedQueries = [
  { query: "sleep mask", route: "DXB-CDG", tier: "Gold", timestamp: "2h ago", count: 23 },
  { query: "travel pillow", route: "DXB-LHR", tier: "Silver", timestamp: "4h ago", count: 18 },
  { query: "neck pillow", route: "DXB-ZRH", tier: "Platinum", timestamp: "6h ago", count: 15 },
  { query: "power bank", route: "DXB-JFK", tier: "Gold", timestamp: "1d ago", count: 12 },
  { query: "eye drops", route: "DXB-SYD", tier: "Silver", timestamp: "1d ago", count: 9 },
];

const routeWinners = [
  { route: "DXB-CDG", product: "Chanel No. 5", sales: 234, revenue: "$28,080" },
  { route: "DXB-ZRH", product: "Rolex Watch", sales: 12, revenue: "$156,000" },
  { route: "DXB-LHR", product: "Johnnie Walker Blue", sales: 156, revenue: "$46,800" },
  { route: "DXB-JFK", product: "MacBook Air", sales: 45, revenue: "$56,250" },
  { route: "DXB-SYD", product: "Swiss Chocolate", sales: 189, revenue: "$9,450" },
];

const aiRevenueSplit = [
  { name: "AI-Influenced", value: 35, amount: 43200, color: "#3b82f6" },
  { name: "Direct Browse", value: 65, amount: 80800, color: "#6b7280" },
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

      {/* AI & Search Performance Section */}
      <div className="space-y-6 pt-8 border-t">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">AI & Search Performance</h2>
          <p className="text-muted-foreground">Monitor search behavior, AI recommendations, and personalization impact.</p>
        </div>

        {/* Top Row - KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="AI Queries Served"
            value="12,430"
            change="+8%"
            changeType="positive"
            icon={Search}
            iconColor="bg-primary"
          />
          <StatCard
            title="Avg Query Latency"
            value="320ms"
            change="Healthy"
            changeType="positive"
            icon={Clock}
            iconColor="bg-success"
          />
          <StatCard
            title="Recommendation CTR"
            value="18.4%"
            change="-2%"
            changeType="negative"
            icon={MousePointer}
            iconColor="bg-accent"
          />
          <StatCard
            title="AI-Influenced Revenue"
            value="$43,200"
            change="35% of GMV"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-success"
          />
        </div>

        {/* Middle Row - Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Search Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <FunnelChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Funnel dataKey="value" data={searchFunnel} isAnimationActive>
                    <LabelList position="center" fill="#fff" stroke="none" dataKey="name" />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* CTR by Position */}
          <Card>
            <CardHeader>
              <CardTitle>CTR by Rank Position</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={ctrByPosition} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" unit="%" />
                  <YAxis dataKey="position" type="category" stroke="#6b7280" width={60} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="ctr" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Personalization Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Personalization Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={personalizationImpact}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="metric" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="without" name="Without" fill="#6b7280" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="with" name="With Personalization" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recommendation CTR Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Recommendation CTR Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={recommendationCtrTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="ctr" stroke="#8b5cf6" strokeWidth={2} name="CTR %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Revenue Split */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Influenced vs Direct Browse Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={aiRevenueSplit}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {aiRevenueSplit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  formatter={(value: any, name: string, props: any) => [
                    `$${props.payload.amount.toLocaleString()} (${value}%)`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bottom Row - Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Search Queries */}
          <Card>
            <CardHeader>
              <CardTitle>Top Search Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead className="text-right">Impressions</TableHead>
                    <TableHead className="text-right">CTR</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSearchQueries.map((query, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{query.query}</TableCell>
                      <TableCell className="text-right">{query.impressions.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{query.ctr}%</TableCell>
                      <TableCell className="text-right font-semibold">{query.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Failed Queries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Failed Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {failedQueries.map((query, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">!</Badge>
                          <span className="font-medium">{query.query}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{query.route}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{query.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Route-Specific Winners */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Route-Specific Product Winners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Top Product</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routeWinners.map((route, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant="secondary">{route.route}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{route.product}</TableCell>
                    <TableCell className="text-right">{route.sales}</TableCell>
                    <TableCell className="text-right font-semibold">{route.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
