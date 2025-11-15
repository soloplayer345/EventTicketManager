import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Ticket, Plus, DollarSign, Hash } from "lucide-react";

const ConfigureTickets = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        quantity: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [eventId]);

    const loadData = async () => {
        try {
            const mockEvent = {
                id: eventId,
                title: "Tech Conference 2025",
            };
            setEvent(mockEvent);
            setTicketTypes([]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const ticketType = {
                eventId: eventId,
                name: formData.name,
                price: parseInt(formData.price),
                description: formData.description,
                quantity: parseInt(formData.quantity),
            };

            setTicketTypes([...ticketTypes, { ...ticketType, id: `tt-${Date.now()}` }]);
            setFormData({ name: "", price: "", description: "", quantity: "" });
            setShowForm(false);
        } catch (error) {
            alert("Failed to create ticket type");
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
                <h1 className="text-4xl font-bold mb-2">Configure Tickets for: {event?.title}</h1>
                <p className="text-xl text-muted-foreground">
                    Create ticket types with different pricing tiers for your event.
                </p>
            </div>

            <div className="mb-6">
                <Button
                    onClick={() => setShowForm(!showForm)}
                    variant={showForm ? "outline" : "default"}
                >
                    {showForm ? (
                        "Cancel"
                    ) : (
                        <>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Ticket Type
                        </>
                    )}
                </Button>
            </div>

            {showForm && (
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Create New Ticket Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Ticket Name *</Label>
                                <div className="relative">
                                    <Ticket className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g., Early Bird, VIP, Standard"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (VND) *</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="price"
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="500000"
                                            min="0"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantity *</Label>
                                    <div className="relative">
                                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="quantity"
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            placeholder="100"
                                            min="1"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe this ticket type..."
                                    rows="3"
                                    required
                                />
                            </div>

                            <Button type="submit">Create Ticket Type</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div>
                <h2 className="text-2xl font-bold mb-6">Ticket Types</h2>
                {ticketTypes.length === 0 ? (
                    <Card>
                        <CardContent className="py-20 text-center">
                            <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">No ticket types configured yet. Add your first ticket type above.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
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

export default ConfigureTickets;
