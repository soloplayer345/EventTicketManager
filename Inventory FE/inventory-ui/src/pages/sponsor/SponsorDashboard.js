import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { ArrowLeft, QrCode, UserPlus, Download, Users, MapPin, Building2 } from "lucide-react";

const SponsorDashboard = () => {
    const { sponsorEventId } = useParams();
    const navigate = useNavigate();
    const [booth, setBooth] = useState(null);
    const [qrInput, setQrInput] = useState("");
    const [visitorId, setVisitorId] = useState("");
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        loadBoothData();
    }, [sponsorEventId]);

    const loadBoothData = async () => {
        try {
            const mockBooth = {
                id: "booth-001",
                sponsorEventId: sponsorEventId,
                name: "Tech Innovation Booth",
                location: "Hall A, Section 3",
            };
            setBooth(mockBooth);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleScanQR = async () => {
        if (!qrInput.trim()) {
            alert("Please enter a QR code");
            return;
        }

        setIsProcessing(true);
        try {
            setTimeout(() => {
                const mockLead = {
                    id: `lead-${Date.now()}`,
                    qrCode: qrInput,
                    name: "John Doe",
                    email: "john@example.com",
                    phone: "0123456789",
                    collectedAt: new Date().toISOString(),
                    source: "QR Scan",
                };

                const alreadyCollected = leads.find(l => l.qrCode === qrInput || l.email === mockLead.email);
                if (alreadyCollected) {
                    alert("This lead has already been collected!");
                    setIsProcessing(false);
                    setQrInput("");
                    return;
                }

                setLeads([mockLead, ...leads]);
                setQrInput("");
                setIsProcessing(false);
            }, 500);
        } catch (error) {
            alert("Invalid QR code or attendee not found");
            setIsProcessing(false);
        }
    };

    const handleManualEntry = async () => {
        if (!visitorId.trim()) {
            alert("Please enter visitor ID or email");
            return;
        }

        setIsProcessing(true);
        try {
            setTimeout(() => {
                const mockLead = {
                    id: `lead-${Date.now()}`,
                    visitorId: visitorId,
                    name: "Jane Smith",
                    email: visitorId.includes("@") ? visitorId : `${visitorId}@example.com`,
                    phone: "0987654321",
                    collectedAt: new Date().toISOString(),
                    source: "Manual Entry",
                };

                setLeads([mockLead, ...leads]);
                setVisitorId("");
                setIsProcessing(false);
            }, 500);
        } catch (error) {
            alert("Failed to collect lead information");
            setIsProcessing(false);
        }
    };

    const handleExport = () => {
        if (leads.length === 0) {
            alert("No leads to export");
            return;
        }

        const headers = ["Name", "Email", "Phone", "Source", "Collected At"];
        const rows = leads.map(lead => [
            lead.name,
            lead.email,
            lead.phone || "",
            lead.source,
            new Date(lead.collectedAt).toLocaleString(),
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `booth-leads-${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <p className="text-muted-foreground">Loading booth dashboard...</p>
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

            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    <h1 className="text-4xl font-bold">Booth Dashboard: {booth?.name}</h1>
                </div>
                <p className="text-xl text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {booth?.location} · Collect leads by scanning QR codes or entering visitor IDs.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <QrCode className="h-5 w-5" />
                            Scan QR Code
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <QrCode className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                value={qrInput}
                                onChange={(e) => setQrInput(e.target.value)}
                                placeholder="Enter QR code..."
                                className="pl-10"
                            />
                        </div>
                        <Button
                            onClick={handleScanQR}
                            className="w-full"
                            disabled={isProcessing || !qrInput.trim()}
                        >
                            {isProcessing ? "Processing..." : "Scan & Collect Lead"}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserPlus className="h-5 w-5" />
                            Manual Entry
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="relative">
                            <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                value={visitorId}
                                onChange={(e) => setVisitorId(e.target.value)}
                                placeholder="Enter visitor ID or email..."
                                className="pl-10"
                            />
                        </div>
                        <Button
                            onClick={handleManualEntry}
                            variant="outline"
                            className="w-full"
                            disabled={isProcessing || !visitorId.trim()}
                        >
                            {isProcessing ? "Processing..." : "Add Lead"}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Collected Leads ({leads.length})
                            </CardTitle>
                        </div>
                        {leads.length > 0 && (
                            <Button onClick={handleExport} variant="outline">
                                <Download className="mr-2 h-4 w-4" />
                                Export CSV
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    {leads.length === 0 ? (
                        <div className="py-20 text-center">
                            <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">
                                No leads collected yet. Start scanning QR codes or enter visitor information.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {leads.map((lead) => (
                                <Card key={lead.id} className="bg-muted/50">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold">{lead.name}</span>
                                                    <Badge variant="outline" className="text-xs">{lead.source}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-1">
                                                    {lead.email} {lead.phone && `· ${lead.phone}`}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(lead.collectedAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default SponsorDashboard;
