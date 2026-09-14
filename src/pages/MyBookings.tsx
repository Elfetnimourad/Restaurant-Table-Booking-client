import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Typography,
} from "@mui/material";

import BookingCard from "../components/BookingCard";
import type { Booking } from "../components/BookingCard";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("You must be logged in.");
                    return;
                }

                const response = await fetch(
                    "http://localhost:5000/bookings/my",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch bookings"
                    );
                }

                setBookings(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Something went wrong");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleView = (booking: Booking) => {
        console.log("View booking:", booking);
navigate(`/bookings/${booking.id}`);
        // Later:
        // 
    };

    const handleCancel = async (booking: Booking) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/bookings/cancelBooking/${booking.id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to cancel booking"
                );
            }

            // Update the booking locally
            setBookings((prevBookings) =>
                prevBookings.map((item) =>
                    item.id === booking.id
                        ? {
                              ...item,
                              status: "cancelled",
                          }
                        : item
                )
            );
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: "80vh",
                py: {
                    xs: 5,
                    md: 8,
                },
                backgroundColor: "#F7F9F8",
            }}
        >
            <Container maxWidth="lg">

                {/* ================= HEADER ================= */}
                <Box sx={{ mb: 5 }}>
                    <Typography
                        variant="h4"
                        sx={{fontWeight:800}}
                        gutterBottom
                    >
                        My Bookings
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        View and manage your restaurant
                        reservations.
                    </Typography>
                </Box>

                {/* ================= ERROR ================= */}
                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 4,
                            borderRadius: 2,
                        }}
                    >
                        {error}
                    </Alert>
                )}

                {/* ================= LOADING ================= */}
                {loading && (
                    <Box
                        sx={{
                            minHeight: 300,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                {/* ================= EMPTY ================= */}
                {!loading &&
                    !error &&
                    bookings.length === 0 && (
                        <Box
                            sx={{
                                minHeight: 300,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                backgroundColor: "white",
                                borderRadius: 3,
                                p: 5,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{fontWeight:700}}
                                gutterBottom
                            >
                                No bookings yet
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                You don't have any restaurant
                                reservations yet.
                            </Typography>
                        </Box>
                    )}

                {/* ================= BOOKINGS ================= */}
                {!loading &&
                    bookings.length > 0 && (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    md: "repeat(2, 1fr)",
                                    lg: "repeat(3, 1fr)",
                                },
                                gap: 3,
                            }}
                        >
                            {bookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onView={handleView}
                                    onCancel={handleCancel}
                                />
                            ))}
                        </Box>
                    )}
            </Container>
        </Box>
    );
};

export default MyBookings;