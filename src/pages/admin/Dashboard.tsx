import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AddIcon from "@mui/icons-material/Add";

interface Booking {
    id: number;
    customer: string;
    table_number: number;
    booking_date: string;
    booking_time: string;
    guests: number;
    status: "pending" | "confirmed" | "cancelled" | "completed";
}

const Dashboard = () => {
    /*
     * Temporary data.
     *
     * Later these values will come from your backend.
     */

    const statistics = {
        totalTables: 20,
        totalBookings: 48,
        pendingBookings: 7,
        confirmedBookings: 32,
    };

    const recentBookings: Booking[] = [
        {
            id: 101,
            customer: "Ahmed Ben Ali",
            table_number: 4,
            booking_date: "2026-09-15",
            booking_time: "19:30",
            guests: 4,
            status: "confirmed",
        },
        {
            id: 102,
            customer: "Sara Mohamed",
            table_number: 2,
            booking_date: "2026-09-15",
            booking_time: "20:00",
            guests: 2,
            status: "pending",
        },
        {
            id: 103,
            customer: "Yacine Karim",
            table_number: 8,
            booking_date: "2026-09-16",
            booking_time: "21:00",
            guests: 6,
            status: "confirmed",
        },
        {
            id: 104,
            customer: "Nadia Amara",
            table_number: 5,
            booking_date: "2026-09-16",
            booking_time: "19:00",
            guests: 3,
            status: "completed",
        },
    ];

    const getStatusColor = (
        status: Booking["status"]
    ) => {
        switch (status) {
            case "confirmed":
                return "success";

            case "pending":
                return "warning";

            case "cancelled":
                return "error";

            case "completed":
                return "info";

            default:
                return "default";
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#F7F9F8",
                py: {
                    xs: 4,
                    md: 6,
                },
            }}
        >
            <Container maxWidth="xl">

                {/* ================= HEADER ================= */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: {
                            xs: "flex-start",
                            sm: "center",
                        },
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        gap: 2,
                        mb: 5,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{fontWeight:800}}
                        >
                            Admin Dashboard
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            Manage your restaurant from one place.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        href="/admin/tables"
                        sx={{
                            backgroundColor: "#123D35",
                            fontWeight: 700,
                            "&:hover": {
                                backgroundColor: "#0C2D27",
                            },
                        }}
                    >
                        Add Table
                    </Button>
                </Box>

                {/* ================= STATISTICS ================= */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            lg: "repeat(4, 1fr)",
                        },
                        gap: 3,
                        mb: 5,
                    }}
                >
                    {/* Total Tables */}

                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Stack
                                sx={{direction:"row",
                                justifyContent:"space-between",
                                alignItems:"center"}}
                            >
                                <Box>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Total Tables
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        
                                        sx={{ mt: 1,fontWeight:800}}
                                    >
                                        {statistics.totalTables}
                                    </Typography>
                                </Box>

                                <TableRestaurantIcon
                                    sx={{
                                        fontSize: 45,
                                        color: "#123D35",
                                    }}
                                />
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* Total Bookings */}

                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Stack
                               sx={{ direction:"row",
                                justifyContent:"space-between",
                                alignItems:"center"
                                }}
                            >
                                <Box>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Total Bookings
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        
                                        sx={{ mt: 1,fontWeight:800 }}
                                    >
                                        {statistics.totalBookings}
                                    </Typography>
                                </Box>

                                <EventNoteIcon
                                    sx={{
                                        fontSize: 45,
                                        color: "#123D35",
                                    }}
                                />
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* Pending */}

                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Stack
                                sx={{direction:"row",
                                justifyContent:"space-between",
                                alignItems:"center"}}
                            >
                                <Box>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Pending Bookings
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        
                                        sx={{ mt: 1,fontWeight:800 }}
                                    >
                                        {
                                            statistics.pendingBookings
                                        }
                                    </Typography>
                                </Box>

                                <PendingActionsIcon
                                    sx={{
                                        fontSize: 45,
                                        color: "#ED6C02",
                                    }}
                                />
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* Confirmed */}

                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Stack
                                sx={{direction:"row",
                                justifyContent:"space-between",
                                alignItems:"center"}}
                            >
                                <Box>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Confirmed Bookings
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        sx={{fontWeight:800,mt: 1}}
                                      
                                    >
                                        {
                                            statistics.confirmedBookings
                                        }
                                    </Typography>
                                </Box>

                                <CheckCircleIcon
                                    sx={{
                                        fontSize: 45,
                                        color: "#2E7D32",
                                    }}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>

                {/* ================= CONTENT ================= */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            lg: "2fr 1fr",
                        },
                        gap: 3,
                    }}
                >
                    {/* ================= RECENT BOOKINGS ================= */}

                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                    mb: 3,
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="h6"
                                        sx={{fontWeight:700}}
                                    >
                                        Recent Bookings
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Latest restaurant reservations
                                    </Typography>
                                </Box>

                                <Button
                                    endIcon={
                                        <ArrowForwardIcon />
                                    }
                                    href="/admin/bookings"
                                    sx={{
                                        color: "#123D35",
                                        fontWeight: 700,
                                    }}
                                >
                                    View All
                                </Button>
                            </Box>

                            <Stack divider={<Divider />}>
                                {recentBookings.map(
                                    (booking) => (
                                        <Box
                                            key={booking.id}
                                            sx={{
                                                py: 2,
                                                display: "flex",
                                                justifyContent:
                                                    "space-between",
                                                alignItems: {
                                                    xs: "flex-start",
                                                    sm: "center",
                                                },
                                                gap: 2,
                                                flexDirection: {
                                                    xs: "column",
                                                    sm: "row",
                                                },
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{fontWeight:700}}
                                                >
                                                    {
                                                        booking.customer
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        mt: 0.5,
                                                    }}
                                                >
                                                    Table{" "}
                                                    {
                                                        booking.table_number
                                                    }{" "}
                                                    •{" "}
                                                    {
                                                        booking.booking_date
                                                    }{" "}
                                                    •{" "}
                                                    {
                                                        booking.booking_time
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {
                                                        booking.guests
                                                    }{" "}
                                                    {booking.guests ===
                                                    1
                                                        ? "guest"
                                                        : "guests"}
                                                </Typography>
                                            </Box>

                                            <Chip
                                                label={
                                                    booking.status
                                                }
                                                color={getStatusColor(
                                                    booking.status
                                                )}
                                                size="small"
                                                sx={{
                                                    textTransform:
                                                        "capitalize",
                                                    fontWeight: 600,
                                                }}
                                            />
                                        </Box>
                                    )
                                )}
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* ================= QUICK ACTIONS ================= */}

                    <Card
                        elevation={2}
                        sx={{
                            borderRadius: 3,
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{fontWeight:700}}
                            >
                                Quick Actions
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5, mb: 3 }}
                            >
                                Manage your restaurant quickly.
                            </Typography>

                            <Stack spacing={2}>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={
                                        <TableRestaurantIcon />
                                    }
                                    href="/admin/tables"
                                    sx={{
                                        py: 1.4,
                                        justifyContent:
                                            "flex-start",
                                        backgroundColor:
                                            "#123D35",
                                        "&:hover": {
                                            backgroundColor:
                                                "#0C2D27",
                                        },
                                    }}
                                >
                                    Manage Tables
                                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={
                                        <EventNoteIcon />
                                    }
                                    href="/admin/bookings"
                                    sx={{
                                        py: 1.4,
                                        justifyContent:
                                            "flex-start",
                                        color: "#123D35",
                                        borderColor:
                                            "#123D35",
                                    }}
                                >
                                    Manage Bookings
                                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={
                                        <PendingActionsIcon />
                                    }
                                    href="/admin/bookings"
                                    sx={{
                                        py: 1.4,
                                        justifyContent:
                                            "flex-start",
                                    }}
                                >
                                    Pending Bookings
                                </Button>

                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </Box>
    );
};

export default Dashboard;