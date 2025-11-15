import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, Users, TrendingUp, Zap, ArrowRight, Mail, Ticket, DollarSign } from "lucide-react";

const roles = [
    {
        title: "Organizer Hub",
        description:
            "Create and manage events, configure TicketTypes with pricing and quantities, collaborate with Sponsors, and track event performance.",
        cta: "Explore organizer tools",
        to: "/organizer",
        roleId: 2,
        icon: Calendar,
    },
    {
        title: "Sponsor Hub",
        description:
            "Browse available Events, submit SponsorEvent proposals with Contribution and SponsorLevel, manage Booths, and track engagement.",
        cta: "View sponsor hub",
        to: "/sponsor",
        roleId: 3,
        icon: Users,
    },
    {
        title: "Attendee Journey",
        description:
            "Discover Events, select TicketTypes, create Orders with OrderDetails, make Payments (Cash/CreditCard/BankTransfer/EWallet), and manage Tickets.",
        cta: "Browse attendee flow",
        to: "/customer",
        roleId: 4,
        icon: Ticket,
    },
    {
        title: "Admin Console",
        description:
            "Manage Accounts (Admin/Organizer/Sponsor/Attendee), approve Events, monitor Orders and Payments, and oversee system-wide operations.",
        cta: "Go to admin insights",
        to: "/admin",
        roleId: 1,
        icon: TrendingUp,
    },
];

const valueHighlights = [
    {
        title: "Unified Journey",
        description:
            "Every actor sees a dedicated workspace tailored to their goals, from ideas to impact.",
        icon: Zap,
    },
    {
        title: "Real-time Insights",
        description:
            "Dashboards adapt to live data, empowering smarter decisions before, during, and after events.",
        icon: TrendingUp,
    },
    {
        title: "Automation Built-in",
        description:
            "Automated approvals, ticket delivery, and follow-up surveys keep your team focused on experience.",
        icon: Zap,
    },
];

const Landing = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <Badge variant="outline" className="w-fit">
                            Campus-wide event OS
                        </Badge>
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                            FU-Eventify turns FPT University gatherings into{" "}
                            <span className="text-primary">unforgettable journeys</span>.
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            From ideation to post-event analytics, orchestrate seamless experiences for organizers,
                            sponsors, attendees, and administrators in one beautifully connected platform.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg">
                                <Link to="/events">
                                    Browse Events
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link to="/login">Sign In</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <Card className="border-l-4 border-l-primary">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Ticket className="h-5 w-5 text-primary" />
                                    <CardTitle>402 Tickets issued</CardTitle>
                                </div>
                                <CardDescription>Tech Conference 2025 · Convention Center</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="border-l-4 border-l-accent">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-accent" />
                                    <CardTitle>₫428M in Payments processed</CardTitle>
                                </div>
                                <CardDescription>Orders with Status: Paid · Payment dashboard</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Roles Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4">Tailored workspaces</Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        Every stakeholder, guided by a curated flow.
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roles.map((role) => {
                        const Icon = role.icon;
                        return (
                            <Card key={role.title} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>{role.title}</CardTitle>
                                    <CardDescription>{role.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild variant="ghost" className="w-full justify-start group">
                                        <Link to={role.to}>
                                            {role.cta}
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* Value Props Section */}
            <section className="container mx-auto px-4 py-20 bg-muted/50 rounded-3xl my-20">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4">Why FU-Eventify</Badge>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        Built for the future of campus events
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {valueHighlights.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card key={item.title}>
                                <CardHeader>
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
                    <CardHeader className="space-y-4">
                        <CardTitle className="text-3xl">Ready to launch legendary experiences?</CardTitle>
                        <CardDescription className="text-primary-foreground/90">
                            Let's co-create your next festival, job fair, or technology showcase. We deliver the blueprint,
                            you deliver the wow factor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="secondary" size="lg">
                            <a href="mailto:eventify@fpt.edu.vn">
                                <Mail className="mr-2 h-4 w-4" />
                                Talk with us
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
};

export default Landing;
