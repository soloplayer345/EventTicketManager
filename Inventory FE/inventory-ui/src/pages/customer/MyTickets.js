import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Ticket, QrCode, Calendar, MapPin, ArrowRight } from "lucide-react";

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        try {
            const accountId = localStorage.getItem("accountId") || "mock-account-id";
            const mockTickets = [
                {
                    id: "ticket-001",
                    ticketTypeId: "tt-001",
                    orderDetailId: "od-001",
                    status: 0,
                    qrCode: "QR-TECH-001",
                    eventId: "event-001",
                    eventTitle: "Tech Conference 2025",
                    ticketTypeName: "Early Bird",
                    eventDate: "2025-06-01",
                    eventPlace: "Convention Center, City",
                },
                {
                    id: "ticket-002",
                    ticketTypeId: "tt-002",
                    orderDetailId: "od-002",
                    status: 0,
                    qrCode: "QR-CAREER-001",
                    eventId: "event-002",
                    eventTitle: "Career Discovery Week",
                    ticketTypeName: "Standard",
                    eventDate: "2025-07-15",
                    eventPlace: "Innovation Hub",
                },
            ];
            setTickets(mockTickets);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <p className="text-muted-foreground">Loading your tickets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12">
                <Badge variant="outline" className="mb-4">My Tickets</Badge>
                <h1 className="text-4xl font-bold mb-4">Your Event Tickets</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    View and manage your tickets. Show QR codes at event check-in.
                </p>
            </header>

            {tickets.length === 0 ? (
                <Card>
                    <CardContent className="py-20 text-center">
                        <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-6">You don't have any tickets yet.</p>
                        <Button asChild>
                            <Link to="/events">
                                Browse Events
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket) => (
                        <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-xl">{ticket.eventTitle}</CardTitle>
                                <CardDescription>
                                    <Badge variant="outline" className="mt-2">{ticket.ticketTypeName}</Badge>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(ticket.eventDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        <span>{ticket.eventPlace}</span>
                                    </div>
                                </div>
                                <div className="p-6 bg-muted rounded-lg text-center">
                                    <QrCode className="h-16 w-16 mx-auto mb-3 text-primary" />
                                    <div className="h-32 w-32 mx-auto border-2 border-primary rounded-lg flex items-center justify-center bg-white p-2 mb-3">
                                        <p className="text-xs font-mono text-center break-all">{ticket.qrCode}</p>
                                    </div>
                                    <p className="font-mono font-semibold text-primary">{ticket.qrCode}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Badge variant={ticket.status === 0 ? "default" : "secondary"}>
                                        {ticket.status === 0 ? "Valid" : "Used"}
                                    </Badge>
                                    <Button asChild variant="outline" size="sm">
                                        <Link to={`/events/${ticket.eventId}`}>
                                            View Event
                                            <ArrowRight className="ml-2 h-3 w-3" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTickets;
