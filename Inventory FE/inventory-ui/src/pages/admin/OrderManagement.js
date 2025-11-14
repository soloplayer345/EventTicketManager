import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ArrowLeft, Search, DollarSign, CreditCard, Wallet, Banknote, Smartphone } from "lucide-react";

const OrderManagement = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const mockOrders = [
                {
                    id: "ORD-001",
                    customerEmail: "student@fpt.edu.vn",
                    amount: 1500000,
                    status: 1,
                    statusName: "Paid",
                    paymentMethod: 1,
                    paymentMethodName: "Credit Card",
                    orderDate: "2025-01-15",
                    eventTitle: "Tech Conference 2025",
                },
                {
                    id: "ORD-002",
                    customerEmail: "attendee@fpt.edu.vn",
                    amount: 750000,
                    status: 0,
                    statusName: "Pending",
                    paymentMethod: null,
                    paymentMethodName: "-",
                    orderDate: "2025-01-14",
                    eventTitle: "Career Discovery Week",
                },
                {
                    id: "ORD-003",
                    customerEmail: "user@fpt.edu.vn",
                    amount: 500000,
                    status: 1,
                    statusName: "Paid",
                    paymentMethod: 3,
                    paymentMethodName: "E-Wallet",
                    orderDate: "2025-01-13",
                    eventTitle: "Spring Festival 2025",
                },
                {
                    id: "ORD-004",
                    customerEmail: "student2@fpt.edu.vn",
                    amount: 2000000,
                    status: 2,
                    statusName: "Cancelled",
                    paymentMethod: null,
                    paymentMethodName: "-",
                    orderDate: "2025-01-12",
                    eventTitle: "Tech Conference 2025",
                },
            ];
            setOrders(mockOrders);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const getPaymentIcon = (method) => {
        const icons = {
            0: Banknote,
            1: CreditCard,
            2: Wallet,
            3: Smartphone,
        };
        return icons[method] || DollarSign;
    };

    const filteredOrders = orders.filter((order) => {
        if (filter !== "all" && order.status !== parseInt(filter)) return false;
        if (search && !order.id.toLowerCase().includes(search.toLowerCase()) && 
            !order.customerEmail.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <p className="text-muted-foreground">Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Button asChild variant="ghost" className="mb-6">
                <button onClick={() => navigate("/admin")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </button>
            </Button>

            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Order Management</h1>
                <p className="text-muted-foreground">View and manage all orders and payments</p>
            </header>

            <div className="mb-6 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by order ID or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <Tabs value={filter} onValueChange={setFilter}>
                <TabsList>
                    <TabsTrigger value="all">All Orders</TabsTrigger>
                    <TabsTrigger value="0">Pending ({orders.filter(o => o.status === 0).length})</TabsTrigger>
                    <TabsTrigger value="1">Paid ({orders.filter(o => o.status === 1).length})</TabsTrigger>
                    <TabsTrigger value="2">Cancelled ({orders.filter(o => o.status === 2).length})</TabsTrigger>
                </TabsList>

                <TabsContent value={filter} className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
                            <CardDescription>Transaction history and payment details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Event</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Payment Method</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                                No orders found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredOrders.map((order) => {
                                            const PaymentIcon = getPaymentIcon(order.paymentMethod);
                                            return (
                                                <TableRow key={order.id}>
                                                    <TableCell className="font-medium">{order.id}</TableCell>
                                                    <TableCell>{order.customerEmail}</TableCell>
                                                    <TableCell className="max-w-[200px] truncate">{order.eventTitle}</TableCell>
                                                    <TableCell className="font-semibold">₫{order.amount.toLocaleString()}</TableCell>
                                                    <TableCell>
                                                        {order.paymentMethod !== null ? (
                                                            <div className="flex items-center gap-2">
                                                                <PaymentIcon className="h-4 w-4 text-muted-foreground" />
                                                                <span>{order.paymentMethodName}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-muted-foreground">-</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={
                                                            order.status === 1 ? "default" :
                                                            order.status === 2 ? "destructive" : "secondary"
                                                        }>
                                                            {order.statusName}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{order.orderDate}</TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default OrderManagement;

