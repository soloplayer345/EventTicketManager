import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import ScrollToTop from "./components/ScrollToTop";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import OrganizerHub from "./pages/OrganizerHub";
import SponsorHub from "./pages/SponsorHub";
import CustomerJourney from "./pages/CustomerJourney";
import AdminConsole from "./pages/AdminConsole";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import EventsList from "./pages/EventsList";
import EventDetail from "./pages/EventDetail";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import CreateEvent from "./pages/organizer/CreateEvent";
import ConfigureTickets from "./pages/organizer/ConfigureTickets";
import CheckIn from "./pages/organizer/CheckIn";
import RequestBooth from "./pages/sponsor/RequestBooth";
import SponsorDashboard from "./pages/sponsor/SponsorDashboard";
import EventApproval from "./pages/admin/EventApproval";
import UserManagement from "./pages/admin/UserManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import SponsorManagement from "./pages/admin/SponsorManagement";
import MyTickets from "./pages/customer/MyTickets";
import TestShadcn from "./pages/TestShadcn";

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/events" element={<EventsList />} />
                    <Route path="/events/:eventId" element={<EventDetail />} />
                    <Route path="/events/:eventId/checkout" element={<Checkout />} />
                    <Route path="/orders/:orderId/success" element={<OrderSuccess />} />
                    <Route path="/organizer" element={<OrganizerHub />} />
                    <Route path="/organizer/events/create" element={<CreateEvent />} />
                    <Route path="/organizer/events/:eventId/tickets" element={<ConfigureTickets />} />
                    <Route path="/organizer/events/:eventId/checkin" element={<CheckIn />} />
                    <Route path="/sponsor" element={<SponsorHub />} />
                    <Route path="/sponsor/booths/request" element={<RequestBooth />} />
                    <Route path="/sponsor/booths/:sponsorEventId/dashboard" element={<SponsorDashboard />} />
                    <Route path="/customer" element={<CustomerJourney />} />
                    <Route path="/customer/tickets" element={<MyTickets />} />
                    <Route path="/admin" element={<AdminConsole />} />
                    <Route path="/admin/events/approve" element={<EventApproval />} />
                    <Route path="/admin/users" element={<UserManagement />} />
                    <Route path="/admin/orders" element={<OrderManagement />} />
                    <Route path="/admin/sponsors" element={<SponsorManagement />} />
                    <Route path="/test-shadcn" element={<TestShadcn />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;