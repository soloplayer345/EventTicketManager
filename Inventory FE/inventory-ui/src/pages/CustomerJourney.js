import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, MapPin, Ticket, ShoppingCart, CreditCard, CheckCircle2, Search, ArrowRight } from "lucide-react";

const CustomerJourney = () => {
    const [events, setEvents] = useState([]);
    const [myTickets, setMyTickets] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const mockEvents = [
            {
                eventId: "event-001",
                title: "Tech Conference 2025",
                description: "Annual technology conference featuring latest innovations",
                startDate: "2025-06-01",
                endDate: "2025-06-03",
                place: "Convention Center",
                ticketTypes: [
                    { id: "tt-001", name: "Early Bird", price: 500000, description: "Early bird discount", quantity: 100 },
                    { id: "tt-002", name: "Regular", price: 750000, description: "Regular admission", quantity: 200 },
                ],
            },
            {
                eventId: "event-002",
                title: "Career Discovery Week",
                description: "Career and networking event for students",
                startDate: "2025-07-15",
                endDate: "2025-07-17",
                place: "Innovation Hub",
                ticketTypes: [
                    { id: "tt-003", name: "Standard", price: 100000, description: "Standard admission", quantity: 500 },
                ],
            },
        ];
        setEvents(mockEvents);

        const mockTickets = [
            {
                id: "ticket-001",
                eventTitle: "Tech Conference 2025",
                ticketType: "Early Bird",
                eventDate: "2025-06-01",
                status: "Valid",
            },
        ];
        setMyTickets(mockTickets);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-8">
                <Badge variant="outline" className="mb-4">Attendee Dashboard</Badge>
                <h1 className="text-4xl font-bold mb-2">Discover Events</h1>
                <p className="text-muted-foreground">Browse events and manage your tickets</p>
            </header>

            {/* My Tickets Summary */}
            {myTickets.length > 0 && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Ticket className="h-5 w-5" />
                            My Tickets ({myTickets.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {myTickets.map((ticket) => (
                                <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <div className="font-semibold">{ticket.eventTitle}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {ticket.ticketType} · {ticket.eventDate}
                                        </div>
                                    </div>
                                    <Badge variant="default">{ticket.status}</Badge>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Button asChild variant="outline" className="w-full">
                                <Link to="/customer/tickets">View All Tickets</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Available Events */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Available Events</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <Card key={event.eventId} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-xl">{event.title}</CardTitle>
                            <CardDescription>{event.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.place}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-semibold">Ticket Types:</p>
                                {event.ticketTypes.map((tt) => (
                                    <div key={tt.id} className="p-3 bg-muted rounded-lg">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold">{tt.name}</span>
                                            <span className="text-primary font-bold">₫{tt.price.toLocaleString()}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">{tt.description}</p>
                                        <Badge variant="outline" className="mt-2 text-xs">{tt.quantity} available</Badge>
                                    </div>
                                ))}
                            </div>
                            <Button asChild className="w-full">
                                <Link to={`/events/${event.eventId}`}>
                                    View Details
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CustomerJourney;
