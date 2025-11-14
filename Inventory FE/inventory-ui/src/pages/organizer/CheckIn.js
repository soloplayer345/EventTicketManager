import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, QrCode, CheckCircle2, Users, Scan } from "lucide-react";

const CheckIn = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [qrInput, setQrInput] = useState("");
    const [scannedTickets, setScannedTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        loadEventData();
    }, [eventId]);

    const loadEventData = async () => {
        try {
            const mockEvent = {
                id: eventId,
                title: "Tech Conference 2025",
                startDate: "2025-06-01T08:00:00",
                endDate: "2025-06-03T17:00:00",
                place: "Convention Center, City",
            };
            setEvent(mockEvent);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleScan = async () => {
        if (!qrInput.trim()) {
            alert("Please enter a QR code");
            return;
        }

        setIsScanning(true);
        try {
            setTimeout(() => {
                const mockTicket = {
                    id: `ticket-${Date.now()}`,
                    qrCode: qrInput,
                    ticketTypeName: "Early Bird",
                    attendeeName: "John Doe",
                    attendeeEmail: "john@example.com",
                    status: 0,
                    checkedIn: false,
                };

                const alreadyScanned = scannedTickets.find(t => t.qrCode === qrInput);
                if (alreadyScanned) {
                    alert("This ticket has already been checked in!");
                    setIsScanning(false);
                    setQrInput("");
                    return;
                }

                const updatedTicket = { ...mockTicket, checkedIn: true, checkedInAt: new Date().toISOString() };
                setScannedTickets([updatedTicket, ...scannedTickets]);
                setQrInput("");
                setIsScanning(false);
            }, 500);
        } catch (error) {
            alert("Invalid ticket or ticket not found for this event");
            setIsScanning(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleScan();
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Button asChild variant="ghost" className="mb-6">
                <button onClick={() => navigate("/organizer")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Organizer Hub
                </button>
            </Button>

            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Check-In: {event?.title}</h1>
                <p className="text-xl text-muted-foreground">
                    Scan QR codes or enter ticket codes to check in attendees.
                </p>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Scan className="h-5 w-5" />
                        Scan Ticket
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <QrCode className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                value={qrInput}
                                onChange={(e) => setQrInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter QR code or scan ticket..."
                                className="pl-10"
                                autoFocus
                            />
                        </div>
                        <Button
                            onClick={handleScan}
                            size="lg"
                            disabled={isScanning || !qrInput.trim()}
                        >
                            {isScanning ? "Scanning..." : "Check In"}
                        </Button>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Total Checked In: <span className="font-semibold text-foreground">{scannedTickets.length}</span>
                    </p>
                </CardContent>
            </Card>

            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Checked In Attendees
                    </h2>
                    {scannedTickets.length > 0 && (
                        <Badge variant="default">{scannedTickets.length} checked in</Badge>
                    )}
                </div>
                {scannedTickets.length === 0 ? (
                    <Card>
                        <CardContent className="py-20 text-center">
                            <QrCode className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No tickets checked in yet.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {scannedTickets.map((ticket) => (
                            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold">{ticket.attendeeName}</span>
                                                <Badge variant="outline" className="text-xs">{ticket.ticketTypeName}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-1">{ticket.attendeeEmail}</p>
                                            <p className="text-xs text-muted-foreground font-mono">
                                                QR: {ticket.qrCode} · Checked in at {new Date(ticket.checkedInAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckIn;
