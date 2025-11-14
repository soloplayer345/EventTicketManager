import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ArrowLeft, Search, Building2, MapPin, DollarSign, Award } from "lucide-react";

const SponsorManagement = () => {
    const navigate = useNavigate();
    const [sponsorEvents, setSponsorEvents] = useState([]);
    const [booths, setBooths] = useState([]);
    const [activeTab, setActiveTab] = useState("sponsors");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const mockSponsorEvents = [
                {
                    id: "se-001",
                    sponsorName: "Tech Corp",
                    sponsorEmail: "sponsor@techcorp.com",
                    eventTitle: "Tech Conference 2025",
                    contribution: 5000000,
                    sponsorLevel: 2,
                    sponsorLevelName: "Gold",
                    status: "Active",
                },
                {
                    id: "se-002",
                    sponsorName: "Innovation Labs",
                    sponsorEmail: "contact@innolabs.com",
                    eventTitle: "Career Discovery Week",
                    contribution: 3000000,
                    sponsorLevel: 1,
                    sponsorLevelName: "Silver",
                    status: "Active",
                },
            ];

            const mockBooths = [
                {
                    id: "booth-001",
                    name: "Tech Innovation Booth",
                    location: "Hall A, Section 3",
                    sponsorName: "Tech Corp",
                    eventTitle: "Tech Conference 2025",
                    sponsorEventId: "se-001",
                },
                {
                    id: "booth-002",
                    name: "Career Hub",
                    location: "Hall B, Section 1",
                    sponsorName: "Innovation Labs",
                    eventTitle: "Career Discovery Week",
                    sponsorEventId: "se-002",
                },
            ];

            setSponsorEvents(mockSponsorEvents);
            setBooths(mockBooths);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
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
                <button onClick={() => navigate("/admin")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </button>
            </Button>

            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Sponsor Management</h1>
                <p className="text-muted-foreground">Manage sponsor relationships and booth assignments</p>
            </header>

            <div className="mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search sponsors or events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="sponsors">Sponsor Events</TabsTrigger>
                    <TabsTrigger value="booths">Booths</TabsTrigger>
                </TabsList>

                <TabsContent value="sponsors" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sponsor Events ({sponsorEvents.length})</CardTitle>
                            <CardDescription>Sponsor contributions and engagement</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Sponsor</TableHead>
                                        <TableHead>Event</TableHead>
                                        <TableHead>Contribution</TableHead>
                                        <TableHead>Level</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sponsorEvents.map((se) => (
                                        <TableRow key={se.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{se.sponsorName}</div>
                                                    <div className="text-sm text-muted-foreground">{se.sponsorEmail}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{se.eventTitle}</TableCell>
                                            <TableCell className="font-semibold">₫{se.contribution.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge className={getLevelColor(se.sponsorLevel)}>
                                                    <Award className="mr-1 h-3 w-3" />
                                                    {se.sponsorLevelName}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="default">{se.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="booths" className="space-y-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Booths ({booths.length})</CardTitle>
                            <CardDescription>Booth assignments and locations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Booth Name</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Sponsor</TableHead>
                                        <TableHead>Event</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {booths.map((booth) => (
                                        <TableRow key={booth.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                                    <span className="font-medium">{booth.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                                    <span>{booth.location}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{booth.sponsorName}</TableCell>
                                            <TableCell>{booth.eventTitle}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SponsorManagement;

