import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const SiteFooter = () => {
    return (
        <footer className="border-t bg-muted/50 mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold">
                                FU
                            </div>
                            <span className="font-bold text-xl">Eventify</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Campus-wide event management platform for FPT University.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Platform</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/events" className="text-muted-foreground hover:text-foreground">
                                    Browse Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/organizer" className="text-muted-foreground hover:text-foreground">
                                    For Organizers
                                </Link>
                            </li>
                            <li>
                                <Link to="/sponsor" className="text-muted-foreground hover:text-foreground">
                                    For Sponsors
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/customer" className="text-muted-foreground hover:text-foreground">
                                    Attendee Guide
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin" className="text-muted-foreground hover:text-foreground">
                                    Admin Console
                                </Link>
                            </li>
                            <li>
                                <a href="#about" className="text-muted-foreground hover:text-foreground">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-muted-foreground hover:text-foreground">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <div className="flex gap-3">
                            <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="mailto:eventify@fpt.edu.vn" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Mail className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
                <Separator className="my-8" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2025 FU-Eventify. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-foreground">Privacy Policy</a>
                        <a href="#" className="hover:text-foreground">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
