import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { LogIn, Mail, Lock, User } from "lucide-react";

const roles = ["Customer", "Organizer", "Sponsor", "Admin"];

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(roles[0]);
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        setTimeout(() => {
            setIsSubmitting(false);
            setMessage("Welcome back! Redirecting to your workspace…");

            switch (role) {
                case "Organizer":
                    navigate("/organizer");
                    break;
                case "Sponsor":
                    navigate("/sponsor");
                    break;
                case "Admin":
                    navigate("/admin");
                    break;
                default:
                    navigate("/customer");
                    break;
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex items-center justify-center p-8 bg-muted/50">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-xl">
                                FU
                            </div>
                        </div>
                        <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
                        <CardDescription className="text-center">
                            Select your role to unlock the tailored workspace designed for you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@fpt.edu.vn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        required
                                    >
                                        {roles.map((roleOption) => (
                                            <option key={roleOption} value={roleOption}>
                                                {roleOption}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                <LogIn className="mr-2 h-4 w-4" />
                                {isSubmitting ? "Signing in…" : "Sign in"}
                            </Button>
                        </form>
                        {message && (
                            <p className={`mt-4 text-sm text-center ${message.includes("Welcome") ? "text-green-600" : "text-red-600"}`}>
                                {message}
                            </p>
                        )}
                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 to-primary/5 items-center justify-center p-12">
                <div className="max-w-md">
                    <blockquote className="text-2xl font-semibold mb-4">
                        "We cut our check-in time by 63% using FU-Eventify."
                    </blockquote>
                    <p className="text-muted-foreground">- Event Ops Lead, Innovate 2025</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
