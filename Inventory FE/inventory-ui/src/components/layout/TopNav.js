import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Calendar, LayoutDashboard, Users, Ticket, Shield, Menu } from "lucide-react";

const TopNav = () => {
    const navItems = [
        { to: "/events", label: "Events", icon: Calendar },
        { to: "/dashboard", label: "Experience", icon: LayoutDashboard },
        { to: "/organizer", label: "Organizer", icon: Users },
        { to: "/sponsor", label: "Sponsor", icon: Users },
        { to: "/customer", label: "Attendee", icon: Ticket },
        { to: "/admin", label: "Admin", icon: Shield },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
                            FU
                        </div>
                        <span className="font-bold text-xl">Eventify</span>
                    </Link>
                    
                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Button
                                    key={item.to}
                                    asChild
                                    variant="ghost"
                                    className="data-[active]:bg-accent data-[active]:text-accent-foreground"
                                >
                                    <NavLink to={item.to}>
                                        <Icon className="mr-2 h-4 w-4" />
                                        {item.label}
                                    </NavLink>
                                </Button>
                            );
                        })}
                    </nav>
                    
                    <div className="flex items-center space-x-2">
                        <Button asChild variant="ghost" size="sm">
                            <NavLink to="/login">Sign in</NavLink>
                        </Button>
                        <Button asChild size="sm">
                            <a href="#get-started">Request demo</a>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNav;
