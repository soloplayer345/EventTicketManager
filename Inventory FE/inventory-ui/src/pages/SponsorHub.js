import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, MapPin, DollarSign, Users, ArrowRight, Plus, Building2, Award } from "lucide-react";

const SponsorHub = () => {
    const [sponsorEvents, setSponsorEvents] = useState([]);
    const [stats, setStats] = useState({
        totalContribution: 0,
        activeEvents: 0,
        totalBooths: 0,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const mockEvents = [
            {
                name: "Tech Conference 2025",
                eventId: "event-001",
                startDate: "2025-06-01",
                endDate: "2025-06-03",
                place: "Convention Center",
                contribution: 5000000,
                sponsorLevel: 2,
                sponsorLevelName: "Gold",
                status: "Active",
                boothName: "Tech Innovation Booth",
                boothLocation: "Hall A, Section 3",
            },
            {
                name: "Career Discovery Week",
                eventId: "event-002",
                startDate: "2025-07-15",
                endDate: "2025-07-17",
                place: "Innovation Hub",
                contribution: 3000000,
                sponsorLevel: 1,
                sponsorLevelName: "Silver",
                status: "Pending",
                boothName: null,
                boothLocation: null,
            },
        ];
        setSponsorEvents(mockEvents);
        setStats({
            totalContribution: mockEvents.reduce((sum, e) => sum + e.contribution, 0),
            activeEvents: mockEvents.filter(e => e.status === "Active").length,
            totalBooths: mockEvents.filter(e => e.boothName).length,
        });
    };

    const getLevelColor = (level) => {
        const colors = {
            0: "bg-amber-100 text-amber-800",
            1: "bg-gray-100 text-gray-800",
            2: "bg-yellow-100 text-yellow-800",
            3: "bg-purple-100 text-purple-800",
        };
        return colors[level] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-8">
                <Badge variant="outline" className="mb-4">Sponsor Dashboard</Badge>
                <h1 className="text-4xl font-bold mb-2">Your Sponsorships</h1>
                <p className="text-muted-foreground">Manage your sponsor events and booth activities</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Contribution</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₫{(stats.totalContribution / 1000000).toFixed(1)}M</div>
                        <p className="text-xs text-muted-foreground mt-1">All time</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeEvents}</div>
                        <p className="text-xs text-muted-foreground mt-1">Currently sponsoring</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Booths Assigned</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalBooths}</div>
                        <p className="text-xs text-muted-foreground mt-1">Active booths</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Action */}
            <div className="mb-8">
                <Button asChild size="lg">
                    <Link to="/sponsor/booths/request">
                        <Plus className="mr-2 h-4 w-4" />
                        Request New Sponsorship
                    </Link>
                </Button>
            </div>

            {/* Sponsor Events */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sponsorEvents.map((event) => (
                    <Card key={event.eventId} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                                <Badge variant={event.status === "Active" ? "default" : "secondary"}>
                                    {event.status}
                                </Badge>
                                <Badge className={getLevelColor(event.sponsorLevel)}>
                                    <Award className="mr-1 h-3 w-3" />
                                    {event.sponsorLevelName}
                                </Badge>
                            </div>
                            <CardTitle className="text-xl">{event.name}</CardTitle>
                            <CardDescription className="space-y-1 mt-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{event.startDate} - {event.endDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.place}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span>₫{event.contribution.toLocaleString()}</span>
                                </div>
                                {event.boothName && (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4" />
                                            <span>{event.boothName}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{event.boothLocation}</span>
                                        </div>
                                    </>
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {event.boothName ? (
                                <Button asChild variant="outline" className="w-full">
                                    <Link to={`/sponsor/booths/${event.eventId}/dashboard`}>
                                        Manage Booth
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            ) : (
                                <Button asChild variant="outline" className="w-full">
                                    <Link to="/sponsor/booths/request">
                                        Request Booth
                                        <Plus className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SponsorHub;
