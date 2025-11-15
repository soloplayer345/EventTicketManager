import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Search, Calendar, MapPin, ArrowRight, Filter } from "lucide-react";

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: "",
        dateFilter: "all",
    });

    useEffect(() => {
        loadEvents();
    }, []);

    const filterEvents = useCallback(() => {
        let filtered = events.filter((event) => !event.isDeleted);

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(
                (event) =>
                    event.title.toLowerCase().includes(searchLower) ||
                    event.description.toLowerCase().includes(searchLower) ||
                    event.place.toLowerCase().includes(searchLower)
            );
        }

        const now = new Date();
        if (filters.dateFilter === "upcoming") {
            filtered = filtered.filter((event) => new Date(event.startDate) >= now);
        } else if (filters.dateFilter === "past") {
            filtered = filtered.filter((event) => new Date(event.endDate) < now);
        }

        setFilteredEvents(filtered);
    }, [events, filters]);

    useEffect(() => {
        filterEvents();
    }, [filterEvents]);

    const loadEvents = async () => {
        try {
            const mockEvents = [
                {
                    id: "event-001",
                    title: "Tech Conference 2025",
                    description: "Annual technology conference featuring latest innovations",
                    startDate: "2025-06-01T08:00:00",
                    endDate: "2025-06-03T17:00:00",
                    place: "Convention Center, City",
                    isDeleted: false,
                },
                {
                    id: "event-002",
                    title: "Career Discovery Week",
                    description: "Career and networking event for students",
                    startDate: "2025-07-15T09:00:00",
                    endDate: "2025-07-17T18:00:00",
                    place: "Innovation Hub",
                    isDeleted: false,
                },
                {
                    id: "event-003",
                    title: "Green Future Fair",
                    description: "Sustainability and environmental awareness event",
                    startDate: "2025-08-20T10:00:00",
                    endDate: "2025-08-22T16:00:00",
                    place: "Central Park",
                    isDeleted: false,
                },
            ];
            setEvents(mockEvents);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
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

    const isUpcoming = (startDate) => {
        return new Date(startDate) >= new Date();
    };

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
            <header className="mb-12">
                <Badge variant="outline" className="mb-4">Browse Events</Badge>
                <h1 className="text-4xl font-bold mb-4">Discover Upcoming Events</h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Find events that interest you. Sign in to register and get tickets.
                </p>
            </header>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search events..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="pl-10"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select
                        value={filters.dateFilter}
                        onChange={(e) => setFilters({ ...filters, dateFilter: e.target.value })}
                        className="h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <option value="all">All Events</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past Events</option>
                    </select>
                </div>
            </div>

            {/* Events Grid */}
            {filteredEvents.length === 0 ? (
                <Card>
                    <CardContent className="py-20 text-center">
                        <p className="text-muted-foreground">No events found. Try adjusting your filters.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <Card key={event.id} className="hover:shadow-lg transition-shadow flex flex-col">
                            <CardHeader>
                                <div className="flex items-start justify-between mb-2">
                                    <CardTitle className="text-xl">{event.title}</CardTitle>
                                    {isUpcoming(event.startDate) && (
                                        <Badge variant="default" className="ml-2">Upcoming</Badge>
                                    )}
                                </div>
                                <CardDescription>{event.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-between">
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        <span>{event.place}</span>
                                    </div>
                                </div>
                                <Button asChild className="w-full">
                                    <Link to={`/events/${event.id}`}>
                                        View Details
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventsList;
