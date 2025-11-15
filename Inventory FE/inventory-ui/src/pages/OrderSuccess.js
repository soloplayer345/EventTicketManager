import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { CheckCircle2, Ticket, ArrowRight, Calendar, CreditCard } from "lucide-react";

const OrderSuccess = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(location.state?.order);
    const [orderDetails, setOrderDetails] = useState(location.state?.orderDetails || []);
    const [payment, setPayment] = useState(location.state?.payment);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(!order);

    useEffect(() => {
        if (order) {
            loadTickets();
        } else {
            loadOrderData();
        }
    }, [orderId, order]);

    const loadOrderData = async () => {
        try {
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const loadTickets = async () => {
        try {
            const allTickets = [];
            for (const od of orderDetails) {
                for (let i = 0; i < od.quantity; i++) {
                    allTickets.push({
                        id: `ticket-${od.id}-${i}`,
                        orderDetailId: od.id,
                        ticketTypeId: "tt-001",
                        status: 0,
                        qrCode: `QR-${od.id}-${i}`,
                    });
                }
            }
            setTickets(allTickets);
        } catch (error) {
            // Error handling
        }
    };

    const getPaymentMethodName = (method) => {
        const methods = {
            0: "Cash",
            1: "Credit Card",
            2: "Bank Transfer",
            3: "E-Wallet"
        };
        return methods[method] || "Unknown";
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <p className="text-muted-foreground">Loading order details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Order Successful!</h1>
                    <p className="text-xl text-muted-foreground">
                        Your payment has been processed. Your tickets are ready.
                    </p>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Order Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Order ID:</span>
                            <span className="font-mono font-semibold">{order?.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant="default" className="bg-green-600">Paid</Badge>
                        </div>
                        {payment && (
                            <>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Payment Method:</span>
                                    <span className="font-semibold">{getPaymentMethodName(payment.paymentMethod)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Amount:</span>
                                    <span className="font-bold text-lg">₫{payment.amount.toLocaleString()}</span>
                                </div>
                            </>
                        )}
                        <Separator />
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Tickets:</span>
                            <span className="font-semibold">{tickets.length}</span>
                        </div>
                    </CardContent>
                </Card>

                {tickets.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Ticket className="h-5 w-5" />
                                Your Tickets
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {tickets.map((ticket, index) => (
                                <Card key={ticket.id} className="bg-muted/50">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">Ticket #{index + 1}</p>
                                                <p className="text-sm text-muted-foreground font-mono mt-1">
                                                    {ticket.qrCode}
                                                </p>
                                            </div>
                                            <div className="h-24 w-24 border-2 border-primary rounded-lg flex items-center justify-center bg-white p-2">
                                                <p className="text-xs font-mono text-center break-all">{ticket.qrCode}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Button asChild size="lg">
                        <button onClick={() => navigate("/customer/orders")}>
                            View My Orders
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <button onClick={() => navigate("/events")}>
                            Browse More Events
                        </button>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
