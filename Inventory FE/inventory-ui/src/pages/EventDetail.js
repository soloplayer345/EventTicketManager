import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { ArrowLeft, Calendar, MapPin, Ticket, ShoppingCart, LogIn } from "lucide-react";

const EventDetail = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [selectedTickets, setSelectedTickets] = useState({});
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
        loadEventData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId]);

    const loadEventData = async () => {
        try {
            const mockEvent = {
                id: eventId,
                title: "Tech Conference 2025",
                description: "Annual technology conference featuring latest innovations in AI, cloud computing, and software development. Join industry leaders and experts for three days of learning and networking.",
                startDate: "2025-06-01T08:00:00",
                endDate: "2025-06-03T17:00:00",
                place: "Convention Center, City",
                isDeleted: false,
            };

            const mockTicketTypes = [
                {
                    id: "tt-001",
                    eventId: eventId,
                    name: "Early Bird",
                    price: 500000,
                    description: "Early bird discount ticket - Limited availability",
                    quantity: 100,
                    isDeleted: false,
                },
                {
                    id: "tt-002",
                    eventId: eventId,
                    name: "Regular",
                    price: 750000,
                    description: "Regular admission ticket",
                    quantity: 200,
                    isDeleted: false,
                },
                {
                    id: "tt-003",
                    eventId: eventId,
                    name: "VIP",
                    price: 1500000,
                    description: "VIP ticket with premium access and networking dinner",
                    quantity: 50,
                    isDeleted: false,
                },
            ];

            setEvent(mockEvent);
            setTicketTypes(mockTicketTypes.filter(tt => !tt.isDeleted));
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleTicketChange = (ticketTypeId, quantity) => {
        const qty = parseInt(quantity) || 0;
        if (qty === 0) {
            const newSelected = { ...selectedTickets };
            delete newSelected[ticketTypeId];
            setSelectedTickets(newSelected);
        } else {
            setSelectedTickets({ ...selectedTickets, [ticketTypeId]: qty });
        }
    };

    const getTotalPrice = () => {
        return ticketTypes.reduce((total, tt) => {
            const qty = selectedTickets[tt.id] || 0;
            return total + tt.price * qty;
        }, 0);
    };

    const getTotalQuantity = () => {
        return Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
    };

    const handleRegister = () => {
        if (!isAuthenticated) {
            navigate("/login", { state: { returnTo: `/events/${eventId}` } });
            return;
        }

        if (getTotalQuantity() === 0) {
            alert("Please select at least one ticket");
            return;
        }

        navigate(`/events/${eventId}/checkout`, {
            state: { selectedTickets, event, ticketTypes },
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <p className="text-muted-foreground">Loading event details...</p>
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <p className="text-muted-foreground mb-4">Event not found.</p>
                    <Button asChild variant="outline">
                        <Link to="/events">Back to Events</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Button asChild variant="ghost" className="mb-6">
                <Link to="/events">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Events
                </Link>
            </Button>

            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
                <p className="text-xl text-muted-foreground">{event.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">Start Date</CardTitle>
                        </div>
                        <CardDescription>{formatDate(event.startDate)}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">End Date</CardTitle>
                        </div>
                        <CardDescription>{formatDate(event.endDate)}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">Location</CardTitle>
                        </div>
                        <CardDescription>{event.place}</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Available Ticket Types</h2>
                <div className="space-y-4">
                    {ticketTypes.map((tt) => (
                        <Card key={tt.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <CardTitle className="text-xl">{tt.name}</CardTitle>
                                            <Badge variant="outline">{tt.quantity} available</Badge>
                                        </div>
                                        <CardDescription className="mb-2">{tt.description}</CardDescription>
                                        <p className="text-2xl font-bold text-primary">
                                            ₫{tt.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Input
                                            type="number"
                                            min="0"
                                            max={tt.quantity}
                                            value={selectedTickets[tt.id] || 0}
                                            onChange={(e) => handleTicketChange(tt.id, e.target.value)}
                                            className="w-20 text-center"
                                        />
                                        <span className="text-sm text-muted-foreground">tickets</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {getTotalQuantity() > 0 && (
                <Card className="sticky bottom-4 border-2 border-primary shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Tickets: {getTotalQuantity()}</p>
                                <p className="text-3xl font-bold">
                                    ₫{getTotalPrice().toLocaleString()}
                                </p>
                            </div>
                            <Button onClick={handleRegister} size="lg" className="w-full sm:w-auto">
                                {isAuthenticated ? (
                                    <>
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Proceed to Checkout
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Sign in to Register
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default EventDetail;
