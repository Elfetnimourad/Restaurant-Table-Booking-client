import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";

import type { Booking } from "../components/BookingCard";

const BookingDetails = () => {
    const { id } = useParams();
    console.log("id",id)
    const navigate = useNavigate();

    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBooking = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("You must be logged in.");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/bookings/getSingleBooking/${id}`,
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
                    data.message || "Failed to fetch booking"
                );
            }

            setBooking(data);
            console.log("booking",booking)
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

    useEffect(() => {
        fetchBooking();
    }, [id]);

    const handleCancel = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:7000/bookings/${id}/cancel`,
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

            setBooking((prev) =>
                prev
                    ? {
                          ...prev,
                          status: "cancelled",
                      }
                    : prev
            );
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        }
    };

    const getStatusColor = () => {
        if (!booking) return "inherit";

        switch (booking.status) {
            case "confirmed":
                return "success.main";

            case "pending":
                return "warning.main";

            case "cancelled":
            case null:
                return "error.main";
            case "completed":
                return "info.main";

            default:
                return "text.primary";
        }
    };

    const canCancel =
        booking?.status === "pending" ||
        booking?.status === "confirmed";

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
            <Container maxWidth="md">

                {/* ================= BACK ================= */}

                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/my-bookings")}
                    sx={{
                        mb: 3,
                        color: "#123D35",
                        fontWeight: 600,
                    }}
                >
                    Back to My Bookings
                </Button>

                {/* ================= LOADING ================= */}

                {loading && (
                    <Box
                        sx={{
                            minHeight: 400,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}

                {/* ================= ERROR ================= */}

                {!loading && error && (
                    <Alert
                        severity="error"
                        sx={{
                            borderRadius: 2,
                        }}
                    >
                        {error}
                    </Alert>
                )}

                {/* ================= DETAILS ================= */}

                {!loading && !error && booking && (
                    <Paper
                        elevation={3}
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                        }}
                    >
                        {/* Header */}

                        <Box
                            sx={{
                                backgroundColor: getStatusColor(),
                                color: "white",
                                p: {
                                    xs: 3,
                                    md: 4,
                                },
                            }}
                        >
                            <Typography
                                variant="overline"
                                sx={{
                                    letterSpacing: 2,
                                    opacity: 0.8,
                                }}
                            >
                                RESTAURANT RESERVATION
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: {
                                        xs: "flex-start",
                                        sm: "center",
                                    },
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },
                                    gap: 2,
                                    mt: 1,
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{fontWeight:800}}
                                >
                                    Booking #{booking.id}
                                </Typography>

                                <Typography
                                    sx={{
                                        px: 2,
                                        py: 0.8,
                                        borderRadius: 5,
                                        backgroundColor:
                                            "rgba(255,255,255,.15)",
                                        textTransform:
                                            "capitalize",
                                        fontWeight: 700,
                                    }}
                                >
                                    {booking.status === null ? "canceled" : booking.status}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Content */}

                        <Box
                            sx={{
                                p: {
                                    xs: 3,
                                    md: 4,
                                },
                            }}
                        >
                            <Stack spacing={3}>

                                {/* Table */}

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <TableRestaurantIcon
                                        sx={{
                                            fontSize: 32,
                                            color: "#123D35",
                                        }}
                                    />

                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Table
                                        </Typography>

                                        <Typography
                                            variant="h6"
                                            sx={{fontWeight:700}}
                                        >
                                            Table{" "}
                                            {
                                                booking.table_number
                                            }
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider />

                                {/* Date */}

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <CalendarMonthIcon
                                        sx={{
                                            color: "#123D35",
                                        }}
                                    />

                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Date
                                        </Typography>

                                        <Typography sx={{fontWeight:600}}>
                                            {
                                                booking.booking_date
                                            }
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Time */}

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <AccessTimeIcon
                                        sx={{
                                            color: "#123D35",
                                        }}
                                    />

                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Time
                                        </Typography>

                                        <Typography sx={{fontWeight:600}}>
                                            {
                                                booking.booking_time
                                            }
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Guests */}

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <PeopleIcon
                                        sx={{
                                            color: "#123D35",
                                        }}
                                    />

                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Guests
                                        </Typography>

                                        <Typography sx={{fontWeight:600}}>
                                            {booking.guests}{" "}
                                            {booking.guests === 1
                                                ? "person"
                                                : "people"}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Location */}

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <LocationOnIcon
                                        sx={{
                                            color: "#123D35",
                                        }}
                                    />

                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Location
                                        </Typography>

                                        <Typography sx={{fontWeight:600}}>
                                            {booking.location}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider />

                                {/* Status */}

                                <Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Booking Status
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        
                                        sx={{
                                            color:
                                                getStatusColor(),
                                            textTransform:
                                                "capitalize",
                                                fontWeight:700
                                        }}
                                    >
                                        {booking.status === null ? "canceled" : booking.status}
                                    </Typography>
                                </Box>

                                {/* Actions */}

                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "row",
                                    }}
                                    spacing={2}
                                    sx={{ pt: 1 }}
                                >
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() =>
                                            navigate(
                                                "/my-bookings"
                                            )
                                        }
                                    >
                                        My Bookings
                                    </Button>

                                    {canCancel && (
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="error"
                                            startIcon={
                                                <CancelIcon />
                                            }
                                            onClick={
                                                handleCancel
                                            }
                                        >
                                            Cancel Booking
                                        </Button>
                                    )}
                                </Stack>
                            </Stack>
                        </Box>
                    </Paper>
                )}
            </Container>
        </Box>
    );
};

export default BookingDetails;