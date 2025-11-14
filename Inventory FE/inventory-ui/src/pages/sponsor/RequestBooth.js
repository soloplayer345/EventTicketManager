import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Calendar, DollarSign, Award, Send } from "lucide-react";

const RequestBooth = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        eventId: "",
        contribution: "",
        sponsorLevel: 0,
    });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const mockEvents = [
                {
                    id: "event-001",
                    title: "Tech Conference 2025",
                    startDate: "2025-06-01T08:00:00",
                    endDate: "2025-06-03T17:00:00",
                },
                {
                    id: "event-002",
                    title: "Career Discovery Week",
                    startDate: "2025-07-15T09:00:00",
                    endDate: "2025-07-17T18:00:00",
                },
            ];
            setEvents(mockEvents.filter(e => !e.isDeleted));
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "sponsorLevel" || name === "contribution" ? parseInt(value) || 0 : value,
        }));
    };

    const handleRoleChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            eventId: value,
        }));
    };

    const handleLevelChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            sponsorLevel: parseInt(value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        if (!formData.eventId) {
            setMessage("Please select an event");
            setIsSubmitting(false);
            return;
        }

        try {
            const sponsorId = localStorage.getItem("sponsorId") || "mock-sponsor-id";
            setTimeout(() => {
                setIsSubmitting(false);
                setMessage("Booth request submitted successfully! Waiting for organizer approval.");
                setTimeout(() => {
                    navigate("/sponsor");
                }, 2000);
            }, 800);
        } catch (error) {
            setMessage("Failed to submit request. Please try again.");
            setIsSubmitting(false);
        }
    };

    const getSponsorLevelName = (level) => {
        const levels = ["Bronze", "Silver", "Gold", "Platinum"];
        return levels[level] || "Unknown";
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
            <Button asChild variant="ghost" className="mb-6">
                <button onClick={() => navigate("/sponsor")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Sponsor Hub
                </button>
            </Button>

            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">Request Booth Space</CardTitle>
                    <CardDescription>
                        Submit a SponsorEvent proposal with your contribution and sponsor level.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="eventId">Select Event *</Label>
                            <Select value={formData.eventId} onValueChange={handleRoleChange}>
                                <SelectTrigger id="eventId" className="w-full">
                                    <SelectValue placeholder="-- Select an event --" />
                                </SelectTrigger>
                                <SelectContent>
                                    {events.map((event) => (
                                        <SelectItem key={event.id} value={event.id}>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {event.title} ({new Date(event.startDate).toLocaleDateString()})
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contribution">Contribution Amount (VND) *</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="contribution"
                                    type="number"
                                    name="contribution"
                                    value={formData.contribution}
                                    onChange={handleChange}
                                    placeholder="5000000"
                                    min="0"
                                    className="pl-10"
                                    required
                                />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                Enter the amount you're contributing to sponsor this event.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sponsorLevel">Sponsor Level *</Label>
                            <Select value={formData.sponsorLevel.toString()} onValueChange={handleLevelChange}>
                                <SelectTrigger id="sponsorLevel" className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Bronze</SelectItem>
                                    <SelectItem value="1">Silver</SelectItem>
                                    <SelectItem value="2">Gold</SelectItem>
                                    <SelectItem value="3">Platinum</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="mt-2">
                                <Badge variant="outline">
                                    <Award className="mr-2 h-3 w-3" />
                                    Selected: {getSponsorLevelName(formData.sponsorLevel)}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button type="submit" size="lg" disabled={isSubmitting} className="flex-1">
                                <Send className="mr-2 h-4 w-4" />
                                {isSubmitting ? "Submitting..." : "Submit Request"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => navigate("/sponsor")}
                            >
                                Cancel
                            </Button>
                        </div>

                        {message && (
                            <p className={`text-sm text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                                {message}
                            </p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RequestBooth;
