import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { ArrowLeft, Calendar, MapPin, FileText, Save } from "lucide-react";

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        place: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        if (new Date(formData.startDate) >= new Date(formData.endDate)) {
            setMessage("End date must be after start date!");
            setIsSubmitting(false);
            return;
        }

        try {
            setTimeout(() => {
                setIsSubmitting(false);
                setMessage("Event created successfully! Redirecting to configure tickets...");
                setTimeout(() => {
                    navigate(`/organizer/events/${"new-event-id"}/tickets`);
                }, 1500);
            }, 800);
        } catch (error) {
            setMessage("Failed to create event. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <Button asChild variant="ghost" className="mb-6">
                <button onClick={() => navigate("/organizer")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Organizer Hub
                </button>
            </Button>

            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">Create New Event</CardTitle>
                    <CardDescription>
                        Fill in the event details. You can configure tickets after creating the event.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Event Title *</Label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Tech Conference 2025"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your event in detail..."
                                rows="5"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Start Date & Time *</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="startDate"
                                        type="datetime-local"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="endDate">End Date & Time *</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="endDate"
                                        type="datetime-local"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="place">Location/Place *</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="place"
                                    type="text"
                                    name="place"
                                    value={formData.place}
                                    onChange={handleChange}
                                    placeholder="e.g., Convention Center, City"
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button type="submit" size="lg" disabled={isSubmitting} className="flex-1">
                                <Save className="mr-2 h-4 w-4" />
                                {isSubmitting ? "Creating..." : "Create Event"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => navigate("/organizer")}
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

export default CreateEvent;
