import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
    Users, 
    Calendar, 
    DollarSign, 
    FileText, 
    Shield, 
    ArrowRight,
    TrendingUp,
    CheckCircle2,
    AlertCircle,
    Info,
    Search,
    Filter
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";

const AdminConsole = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [pendingEvents, setPendingEvents] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        // Mock data - replace with actual API calls
        setRecentOrders([
            { id: "ORD-001", customer: "user@example.com", amount: 1500000, status: "Paid", date: "2025-01-15" },
            { id: "ORD-002", customer: "attendee@example.com", amount: 750000, status: "Pending", date: "2025-01-14" },
            { id: "ORD-003", customer: "student@example.com", amount: 500000, status: "Paid", date: "2025-01-13" },
        ]);
        setPendingEvents([
            { id: "EVT-001", title: "Spring Festival 2025", organizer: "org@example.com", submitted: "2025-01-14" },
            { id: "EVT-002", title: "Tech Workshop Series", organizer: "tech@example.com", submitted: "2025-01-13" },
        ]);
        setRecentUsers([
            { id: "USR-001", email: "newuser@example.com", role: "Attendee", created: "2025-01-15" },
            { id: "USR-002", email: "sponsor@example.com", role: "Sponsor", created: "2025-01-14" },
        ]);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-8">
                <Badge variant="outline" className="mb-4">Admin Dashboard</Badge>
                <h1 className="text-4xl font-bold mb-2">System Overview</h1>
                <p className="text-muted-foreground">Monitor and manage all platform activities</p>
            </header>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5,842</div>
                        <p className="text-xs text-muted-foreground mt-1">+127 this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">37</div>
                        <p className="text-xs text-muted-foreground mt-1">5 pending approval</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₫428M</div>
                        <p className="text-xs text-muted-foreground mt-1">+18% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,203</div>
                        <p className="text-xs text-muted-foreground mt-1">45 pending payment</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Button asChild variant="outline" className="h-auto py-6">
                    <Link to="/admin/users">
                        <Users className="mr-2 h-5 w-5" />
                        <div className="text-left">
                            <div className="font-semibold">User Management</div>
                            <div className="text-xs text-muted-foreground">Manage accounts & roles</div>
                        </div>
                    </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-6">
                    <Link to="/admin/events/approve">
                        <Calendar className="mr-2 h-5 w-5" />
                        <div className="text-left">
                            <div className="font-semibold">Event Approval</div>
                            <div className="text-xs text-muted-foreground">Review pending events</div>
                        </div>
                    </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-6">
                    <Link to="/admin/orders">
                        <FileText className="mr-2 h-5 w-5" />
                        <div className="text-left">
                            <div className="font-semibold">Order Management</div>
                            <div className="text-xs text-muted-foreground">View all orders</div>
                        </div>
                    </Link>
                </Button>
                <Button asChild variant="outline" className="h-auto py-6">
                    <Link to="/admin/sponsors">
                        <Shield className="mr-2 h-5 w-5" />
                        <div className="text-left">
                            <div className="font-semibold">Sponsor Management</div>
                            <div className="text-xs text-muted-foreground">Manage sponsors & booths</div>
                        </div>
                    </Link>
                </Button>
            </div>

            {/* Recent Activity Tabs */}
            <Tabs defaultValue="orders" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                    <TabsTrigger value="events">Pending Events</TabsTrigger>
                    <TabsTrigger value="users">New Users</TabsTrigger>
                </TabsList>
                
                <TabsContent value="orders" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>Latest transactions and payments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>{order.customer}</TableCell>
                                            <TableCell>₫{order.amount.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={order.status === "Paid" ? "default" : "secondary"}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-4">
                                <Button asChild variant="outline" className="w-full">
                                    <Link to="/admin/orders">View All Orders</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="events" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Event Approvals</CardTitle>
                            <CardDescription>Events waiting for admin review</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {pendingEvents.map((event) => (
                                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <div className="font-semibold">{event.title}</div>
                                            <div className="text-sm text-muted-foreground">
                                                Submitted by {event.organizer} on {event.submitted}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline">Review</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <Button asChild variant="outline" className="w-full">
                                    <Link to="/admin/events/approve">View All Pending Events</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recently Registered Users</CardTitle>
                            <CardDescription>New account registrations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.email}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{user.role}</Badge>
                                            </TableCell>
                                            <TableCell>{user.created}</TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-4">
                                <Button asChild variant="outline" className="w-full">
                                    <Link to="/admin/users">View All Users</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminConsole;
