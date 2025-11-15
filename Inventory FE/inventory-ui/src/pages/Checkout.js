import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, ShoppingCart, CreditCard, Wallet, Banknote, Smartphone, CheckCircle2, Ticket } from "lucide-react";

const Checkout = () => {
    const { eventId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedTickets, setSelectedTickets] = useState(location.state?.selectedTickets || {});
    const [event, setEvent] = useState(location.state?.event);
    const [ticketTypes, setTicketTypes] = useState(location.state?.ticketTypes || []);
    const [paymentMethod, setPaymentMethod] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!event || !selectedTickets || Object.keys(selectedTickets).length === 0) {
            navigate(`/events/${eventId}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId]);

    const getTotalPrice = () => {
        return ticketTypes.reduce((total, tt) => {
            const qty = selectedTickets[tt.id] || 0;
            return total + tt.price * qty;
        }, 0);
    };

    const getTotalQuantity = () => {
        return Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const accountId = localStorage.getItem("accountId") || "mock-account-id";
            const order = {
                accountId: accountId,
                orderDate: new Date().toISOString(),
                status: 0,
            };

            const createdOrder = { id: `order-${Date.now()}` };
            const orderDetails = [];
            
            for (const [ticketTypeId, quantity] of Object.entries(selectedTickets)) {
                if (quantity > 0) {
                    const ticketType = ticketTypes.find(tt => tt.id === ticketTypeId);
                    orderDetails.push({
                        id: `od-${Date.now()}-${ticketTypeId}`,
                        orderId: createdOrder.id,
                        total: ticketType.price * quantity,
                        quantity: quantity,
                    });
                }
            }

            const payment = {
                orderId: createdOrder.id,
                amount: getTotalPrice(),
                paymentMethod: paymentMethod,
                paymentDate: new Date().toISOString(),
            };

            setTimeout(() => {
                setIsProcessing(false);
                navigate(`/orders/${createdOrder.id}/success`, {
                    state: {
                        order: createdOrder,
                        orderDetails,
                        payment,
                        event,
                    },
                });
            }, 2000);
        } catch (error) {
            setIsProcessing(false);
            alert("Payment failed. Please try again.");
        }
    };

    const paymentMethods = [
        { value: 0, label: "Cash", icon: Banknote },
        { value: 1, label: "Credit Card", icon: CreditCard },
        { value: 2, label: "Bank Transfer", icon: Wallet },
        { value: 3, label: "E-Wallet (VNPay/MoMo)", icon: Smartphone },
    ];

    if (!event) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <p className="text-muted-foreground">No event data found. Redirecting...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Button asChild variant="ghost" className="mb-6">
                <button onClick={() => navigate(`/events/${eventId}`)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Event
                </button>
            </Button>

            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Checkout</h1>
                <p className="text-xl text-muted-foreground">Review your order and complete payment</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                            <p className="text-muted-foreground">{event.description}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Selected Tickets</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {ticketTypes
                                .filter(tt => selectedTickets[tt.id] > 0)
                                .map(tt => (
                                    <div key={tt.id} className="flex justify-between items-start py-3 border-b last:border-0">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Ticket className="h-4 w-4 text-primary" />
                                                <span className="font-semibold">{tt.name}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{tt.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Qty: {selectedTickets[tt.id]}</p>
                                            <p className="font-semibold">₫{(tt.price * selectedTickets[tt.id]).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {paymentMethods.map(method => {
                                const Icon = method.icon;
                                return (
                                    <button
                                        key={method.value}
                                        onClick={() => setPaymentMethod(method.value)}
                                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                                            paymentMethod === method.value
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                                                paymentMethod === method.value
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted"
                                            }`}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <span className="font-medium">{method.label}</span>
                                            {paymentMethod === method.value && (
                                                <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Tickets:</span>
                                <span className="font-semibold">{getTotalQuantity()}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total Amount:</span>
                                <span className="text-primary">₫{getTotalPrice().toLocaleString()}</span>
                            </div>
                            <Button
                                onClick={handlePayment}
                                className="w-full"
                                size="lg"
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    "Processing Payment..."
                                ) : (
                                    <>
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Pay with {paymentMethods.find(m => m.value === paymentMethod)?.label}
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
