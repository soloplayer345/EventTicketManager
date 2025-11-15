import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { UserPlus, Mail, Lock, User, Building2, Phone, FileText } from "lucide-react";

const roles = [
    { value: 4, label: "Customer (Attendee)" },
    { value: 2, label: "Organizer" },
    { value: 3, label: "Sponsor" },
];

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        accountRole: 4,
        name: "",
        description: "",
        information: "",
        contact: "",
    });
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoleChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            accountRole: parseInt(value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match!");
            setIsSubmitting(false);
            return;
        }

        if (formData.password.length < 6) {
            setMessage("Password must be at least 6 characters!");
            setIsSubmitting(false);
            return;
        }

        setTimeout(() => {
            setIsSubmitting(false);
            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }, 800);
    };

    const isOrganizer = formData.accountRole === 2;
    const isSponsor = formData.accountRole === 3;

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex items-center justify-center p-8 bg-muted/50">
                <Card className="w-full max-w-2xl">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-bold text-xl">
                                FU
                            </div>
                        </div>
                        <CardTitle className="text-2xl text-center">Create your account</CardTitle>
                        <CardDescription className="text-center">
                            Join FU-Eventify and start managing or attending events.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@fpt.edu.vn"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="accountRole">Account Role</Label>
                                    <Select value={formData.accountRole.toString()} onValueChange={handleRoleChange}>
                                        <SelectTrigger id="accountRole" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role.value} value={role.value.toString()}>
                                                    {role.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="At least 6 characters"
                                            className="pl-10"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Re-enter your password"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {(isOrganizer || isSponsor) && (
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        {isOrganizer ? "Organizer Name" : "Sponsor Name"}
                                    </Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder={isOrganizer ? "Your organization name" : "Your company name"}
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {isOrganizer && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder="Describe your organization"
                                                rows="3"
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact">Contact</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="contact"
                                                type="text"
                                                name="contact"
                                                value={formData.contact}
                                                onChange={handleChange}
                                                placeholder="Phone number or contact info"
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {isSponsor && (
                                <div className="space-y-2">
                                    <Label htmlFor="information">Information</Label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Textarea
                                            id="information"
                                            name="information"
                                            value={formData.information}
                                            onChange={handleChange}
                                            placeholder="Company information and details"
                                            rows="3"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                {isSubmitting ? "Registering..." : "Create Account"}
                            </Button>
                        </form>

                        {message && (
                            <p className={`mt-4 text-sm text-center ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
                                {message}
                            </p>
                        )}

                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 to-primary/5 items-center justify-center p-12">
                <div className="max-w-md">
                    <blockquote className="text-2xl font-semibold mb-4">
                        "Join thousands of organizers, sponsors, and attendees managing events seamlessly."
                    </blockquote>
                    <p className="text-muted-foreground">- FU-Eventify Platform</p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
