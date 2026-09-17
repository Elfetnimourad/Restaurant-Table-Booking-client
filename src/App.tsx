import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tables from "./pages/Tables";
import MyBookings from "./pages/MyBookings";
import BookingDetails from "./pages/BookingDetails";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import TablesManagement from "./pages/admin/TablesManagement";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { AuthProvider } from "./context/authContext";
import Profile from "./components/Profile";

function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Navbar />

            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Customer Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<Profile />} />

                    <Route path="/tables" element={<Tables />} />
                    <Route path="/my-bookings" element={<MyBookings />} />
                    <Route
                        path="/bookings/:id"
                        element={<BookingDetails />}
                    />
                </Route>

                {/* Protected Admin Routes */}
                <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<Dashboard />} />
                    <Route
                        path="/admin/tables"
                        element={<TablesManagement />}
                    />
                </Route>
            </Routes>

            <Footer />
        </BrowserRouter>
        </AuthProvider>
    );
}

export default App;