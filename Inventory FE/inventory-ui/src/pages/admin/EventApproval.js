import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ArrowLeft, Calendar, MapPin, CheckCircle2, XCircle, Search } from "lucide-react";

const EventApproval = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("pending");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const mockEvents = [
                {
                    id: "event-001",
                    title: "Spring Festival 2025",
                    description: "Annual spring celebration with music, food, and cultural activities",
                    startDate: "2025-03-15T08:00:00",
                    endDate: "2025-03-17T20:00:00",
                    place: "Main Campus Square",
                    organizer: "org@fpt.edu.vn",
                    organizerName: "Student Union",
                    status: "pending",
                    submittedDate: "2025-01-14",
                },
                {
                    id: "event-002",
                    title: "Tech Workshop Series",
                    description: "Hands-on workshops on AI, Cloud Computing, and Web Development",
                    startDate: "2025-04-01T09:00:00",
                    endDate: "2025-04-05T17:00:00",
                    place: "Innovation Lab",
                    organizer: "tech@fpt.edu.vn",
                    organizerName: "Tech Club",
                    status: "pending",
                    submittedDate: "2025-01-13",
                },
                {
                    id: "event-003",
                    title: "Career Fair 2025",
                    description: "Connect with top employers and explore career opportunities",
                    startDate: "2025-05-10T08:00:00",
                    endDate: "2025-05-10T18:00:00",
                    place: "Convention Center",
                    organizer: "career@fpt.edu.vn",
                    organizerName: "Career Services",
                    status: "approved",
                    submittedDate: "2025-01-10",
                },
            ];
            setEvents(mockEvents);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleApprove = async (eventId) => {
        try {
            setEvents(events.map(e => e.id === eventId ? { ...e, status: "approved" } : e));
        } catch (error) {
            alert("Failed to approve event");
        }
    };

    const handleReject = async (eventId) => {
        if (!window.confirm("Are you sure you want to reject this event?")) {
            return;
        }
        try {
            setEvents(events.map(e => e.id === eventId ? { ...e, status: "rejected" } : e));
        } catch (error) {
            alert("Failed to reject event");
        }
    };

    const filteredEvents = events.filter(event => {
        if (filter !== "all" && event.status !== filter) return false;
        if (search && !event.title.toLowerCase().includes(search.toLowerCase()) && 
            !event.organizerName.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <p className="text-muted-foreground">Loading events...</p>
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
                <h1 className="text-4xl font-bold mb-2">Event Approval</h1>
                <p className="text-muted-foreground">Review and approve event submissions from organizers</p>
            </header>

            <div className="mb-6 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <Tabs value={filter} onValueChange={setFilter}>
                <TabsList>
                    <TabsTrigger value="pending">
                        Pending ({events.filter(e => e.status === "pending").length})
                    </TabsTrigger>
                    <TabsTrigger value="approved">
                        Approved ({events.filter(e => e.status === "approved").length})
                    </TabsTrigger>
                    <TabsTrigger value="rejected">
                        Rejected ({events.filter(e => e.status === "rejected").length})
                    </TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>

                <TabsContent value={filter} className="space-y-4 mt-6">
                    {filteredEvents.length === 0 ? (
                        <Card>
                            <CardContent className="py-20 text-center">
                                <p className="text-muted-foreground">No events found</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {filteredEvents.map((event) => (
                                <Card key={event.id}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <CardTitle className="text-xl">{event.title}</CardTitle>
                                                    <Badge variant={
                                                        event.status === "approved" ? "default" :
                                                        event.status === "rejected" ? "destructive" : "secondary"
                                                    }>
                                                        {event.status}
                                                    </Badge>
                                                </div>
                                                <CardDescription className="mb-4">{event.description}</CardDescription>
                                                <div className="grid md:grid-cols-2 gap-4 text-sm">
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
                                                    <div className="text-muted-foreground">
                                                        Organizer: {event.organizerName} ({event.organizer})
                                                    </div>
                                                    <div className="text-muted-foreground">
                                                        Submitted: {event.submittedDate}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    {event.status === "pending" && (
                                        <CardContent>
                                            <div className="flex gap-3">
                                                <Button onClick={() => handleApprove(event.id)}>
                                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                                    Approve
                                                </Button>
                                                <Button onClick={() => handleReject(event.id)} variant="destructive">
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Reject
                                                </Button>
                                            </div>
                                        </CardContent>
                                    )}
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default EventApproval;
