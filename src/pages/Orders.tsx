import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  { id: "ORD001", passenger: "John Smith", flight: "BA156", items: 3, total: "$425", payment: "Paid", delivery: "Pre-flight" },
  { id: "ORD002", passenger: "Emma Wilson", flight: "AF234", items: 1, total: "$275", payment: "Paid", delivery: "In-flight" },
  { id: "ORD003", passenger: "Michael Chen", flight: "LH890", items: 5, total: "$890", payment: "Pending", delivery: "Pre-flight" },
  { id: "ORD004", passenger: "Sarah Johnson", flight: "BA156", items: 2, total: "$340", payment: "Paid", delivery: "Delivered" },
  { id: "ORD005", passenger: "David Brown", flight: "QF12", items: 4, total: "$620", payment: "Paid", delivery: "Pre-flight" },
];

export default function Orders() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Orders & Fulfillment</h1>
        <p className="text-muted-foreground">Track and manage customer orders</p>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Passenger Name</TableHead>
                <TableHead>Flight No.</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Delivery Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.passenger}</TableCell>
                  <TableCell>{order.flight}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <Badge variant={order.payment === "Paid" ? "default" : "secondary"}>
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.delivery === "Delivered"
                          ? "default"
                          : order.delivery === "In-flight"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {order.delivery}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Details
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
