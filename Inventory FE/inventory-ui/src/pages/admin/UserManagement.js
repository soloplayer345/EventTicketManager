import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ArrowLeft, Search, UserCheck, UserX, Mail } from "lucide-react";

const UserManagement = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => {
        try {
            const mockAccounts = [
                {
                    id: "acc-001",
                    email: "admin@fpt.edu.vn",
                    accountRole: 1,
                    roleName: "Admin",
                    createdDate: "2024-01-15",
                    isDeleted: false,
                },
                {
                    id: "acc-002",
                    email: "organizer@fpt.edu.vn",
                    accountRole: 2,
                    roleName: "Organizer",
                    createdDate: "2024-02-20",
                    isDeleted: false,
                },
                {
                    id: "acc-003",
                    email: "sponsor@company.com",
                    accountRole: 3,
                    roleName: "Sponsor",
                    createdDate: "2024-03-10",
                    isDeleted: false,
                },
                {
                    id: "acc-004",
                    email: "student@fpt.edu.vn",
                    accountRole: 4,
                    roleName: "Attendee",
                    createdDate: "2024-04-05",
                    isDeleted: false,
                },
                {
                    id: "acc-005",
                    email: "inactive@fpt.edu.vn",
                    accountRole: 4,
                    roleName: "Attendee",
                    createdDate: "2024-01-10",
                    isDeleted: true,
                },
            ];
            setAccounts(mockAccounts);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleToggleStatus = async (accountId, currentStatus) => {
        try {
            setAccounts(
                accounts.map((acc) =>
                    acc.id === accountId ? { ...acc, isDeleted: !currentStatus } : acc
                )
            );
        } catch (error) {
            alert("Failed to update account status");
        }
    };

    const filteredAccounts = accounts.filter((account) => {
        if (filter !== "all" && account.accountRole !== parseInt(filter)) return false;
        if (search && !account.email.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center py-20">
                    <p className="text-muted-foreground">Loading users...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Button asChild variant="ghost" className="mb-6">
                <button onClick={() => navigate("/admin")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </button>
            </Button>

            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">User Management</h1>
                <p className="text-muted-foreground">Manage all user accounts and their roles</p>
            </header>

            <div className="mb-6 flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="1">Admin</SelectItem>
                        <SelectItem value="2">Organizer</SelectItem>
                        <SelectItem value="3">Sponsor</SelectItem>
                        <SelectItem value="4">Attendee</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Accounts ({filteredAccounts.length})</CardTitle>
                    <CardDescription>View and manage user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAccounts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No accounts found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredAccounts.map((account) => (
                                    <TableRow key={account.id} className={account.isDeleted ? "opacity-60" : ""}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                {account.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{account.roleName}</Badge>
                                        </TableCell>
                                        <TableCell>{account.createdDate}</TableCell>
                                        <TableCell>
                                            {account.isDeleted ? (
                                                <Badge variant="destructive">Disabled</Badge>
                                            ) : (
                                                <Badge variant="default">Active</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                onClick={() => handleToggleStatus(account.id, account.isDeleted)}
                                                variant={account.isDeleted ? "default" : "destructive"}
                                                size="sm"
                                            >
                                                {account.isDeleted ? (
                                                    <>
                                                        <UserCheck className="mr-2 h-4 w-4" />
                                                        Enable
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserX className="mr-2 h-4 w-4" />
                                                        Disable
                                                    </>
                                                )}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserManagement;
