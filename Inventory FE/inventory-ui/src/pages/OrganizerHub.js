import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Calendar, Ticket, Users, DollarSign, ArrowRight, Plus, MapPin } from "lucide-react";

const OrganizerHub = () => {
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState({
        totalEvents: 0,
        totalTickets: 0,
        totalRevenue: 0,
        upcomingEvents: 0,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const mockEvents = [
            {
                id: "event-001",
                title: "Tech Conference 2025",
                startDate: "2025-06-01",
                endDate: "2025-06-03",
                place: "Convention Center",
                ticketTypes: 3,
                ticketsSold: 342,
                revenue: 256500000,
                status: "Active",
            },
            {
                id: "event-002",
                title: "Spring Festival 2025",
                startDate: "2025-03-15",
                endDate: "2025-03-17",
                place: "Main Campus Square",
                ticketTypes: 2,
                ticketsSold: 128,
                revenue: 64000000,
                status: "Active",
            },
        ];
        setEvents(mockEvents);
        setStats({
            totalEvents: mockEvents.length,
            totalTickets: mockEvents.reduce((sum, e) => sum + e.ticketsSold, 0),
            totalRevenue: mockEvents.reduce((sum, e) => sum + e.revenue, 0),
            upcomingEvents: mockEvents.filter(e => new Date(e.startDate) > new Date()).length,
        });
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-8">
                <Badge variant="outline" className="mb-4">Organizer Dashboard</Badge>
                <h1 className="text-4xl font-bold mb-2">Your Events</h1>
                <p className="text-muted-foreground">Manage your events, tickets, and track performance</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalEvents}</div>
                        <p className="text-xs text-muted-foreground mt-1">{stats.upcomingEvents} upcoming</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalTickets}</div>
                        <p className="text-xs text-muted-foreground mt-1">Across all events</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₫{(stats.totalRevenue / 1000000).toFixed(1)}M</div>
                        <p className="text-xs text-muted-foreground mt-1">All time</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Sponsors</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground mt-1">Collaborating</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Action */}
            <div className="mb-8">
                <Button asChild size="lg">
                    <Link to="/organizer/events/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Event
                    </Link>
                </Button>
            </div>

            {/* Events Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Events</CardTitle>
                    <CardDescription>Manage and monitor your event performance</CardDescription>
                </CardHeader>
                <CardContent>
                    {events.length === 0 ? (
                        <div className="py-20 text-center">
                            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground mb-4">No events yet. Create your first event!</p>
                            <Button asChild>
                                <Link to="/organizer/events/create">Create Event</Link>
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Event</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Tickets Sold</TableHead>
                                    <TableHead>Revenue</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell className="font-medium">{event.title}</TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div>{new Date(event.startDate).toLocaleDateString()}</div>
                                                <div className="text-muted-foreground">to {new Date(event.endDate).toLocaleDateString()}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{event.place}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Ticket className="h-4 w-4 text-muted-foreground" />
                                                <span>{event.ticketsSold}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold">₫{(event.revenue / 1000000).toFixed(1)}M</TableCell>
                                        <TableCell>
                                            <Badge variant="default">{event.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Button asChild variant="ghost" size="sm">
                                                <Link to={`/organizer/events/${event.id}/tickets`}>
                                                    Manage
                                                    <ArrowRight className="ml-2 h-3 w-3" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default OrganizerHub;
