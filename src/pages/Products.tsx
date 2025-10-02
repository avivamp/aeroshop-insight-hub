import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  { id: "P001", name: "Chanel No. 5 Eau de Parfum", category: "Perfumes", price: "$275", stock: 45, status: "In Stock" },
  { id: "P002", name: "Dior Sauvage EDT", category: "Perfumes", price: "$260", stock: 32, status: "In Stock" },
  { id: "P003", name: "Apple MacBook Air M2", category: "Electronics", price: "$1,249", stock: 8, status: "Low Stock" },
  { id: "P004", name: "Lindt Swiss Chocolate Box", category: "Food & Beverage", price: "$50", stock: 120, status: "In Stock" },
  { id: "P005", name: "Johnnie Walker Blue Label", category: "Alcohol", price: "$300", stock: 15, status: "In Stock" },
  { id: "P006", name: "Ray-Ban Aviator Sunglasses", category: "Fashion", price: "$180", stock: 3, status: "Low Stock" },
  { id: "P007", name: "Gucci Guilty Pour Homme", category: "Perfumes", price: "$285", stock: 0, status: "Out of Stock" },
  { id: "P008", name: "Toblerone Gift Pack", category: "Food & Beverage", price: "$35", stock: 89, status: "In Stock" },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Products & Catalog</h1>
          <p className="text-muted-foreground">Manage your product inventory and catalog</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "In Stock"
                          ? "default"
                          : product.status === "Low Stock"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
