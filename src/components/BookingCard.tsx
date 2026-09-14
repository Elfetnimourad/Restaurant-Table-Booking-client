import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export interface Booking {
    id: number;
    table_id: number;
    table_number: number;
    booking_date: string;
    booking_time: string;
    guests: number;
    location: string;
    status: "pending" | "confirmed" | "processing" | "cancelled" | "completed";
}

interface BookingCardProps {
    booking: Booking;
    onView?: (booking: Booking) => void;
    onCancel?: (booking: Booking) => void;
}

const BookingCard = ({
    booking,
    onView,
    onCancel,
}: BookingCardProps) => {
    const getStatusColor = () => {
        switch (booking.status) {
            case "confirmed":
                return "success";

            case "pending":
                return "warning";

            case "cancelled":
            case null:
                return "error";

            case "completed":
                return "info";

            default:
                return "default";
        }
    };

    const canCancel =
        booking.status === "pending" ||
        booking.status === "confirmed";

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                height: "100%",
                 backgroundColor: getStatusColor(),
                transition: "0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
        >
            <CardContent>
                <Stack spacing={2.5}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{fontWeight:700}}
                            >
                                Booking #{booking.id}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Restaurant Reservation
                            </Typography>
                        </Box>

                        <Chip
                            label={booking.status === null ? "canceled" : booking.status}
                            color={getStatusColor()}
                            size="small"
                            sx={{
                                textTransform: "capitalize",
                                fontWeight: 600,
                            }}
                        />
                    </Box>

                    <Divider />

                    {/* Table */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <TableRestaurantIcon color="action" />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Table
                            </Typography>

                            <Typography sx={{fontWeight:600}}>
                                Table {booking.table_number}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Date */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <CalendarMonthIcon color="action" />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Date
                            </Typography>

                            <Typography sx={{fontWeight:600}}>
                                {booking.booking_date}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Time */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <AccessTimeIcon color="action" />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Time
                            </Typography>

                            <Typography sx={{fontWeight:600}}>
                                {booking.booking_time}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Guests */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                        }}
                    >
                        <PeopleIcon color="action" />

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
                            gap: 1.5,
                        }}
                    >
                        <LocationOnIcon color="action" />

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

                    {/* Actions */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                    >
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => onView?.(booking)}
                        >
                            View Details
                        </Button>

                        {canCancel && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                onClick={() => onCancel?.(booking)}
                            >
                                Cancel Booking
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default BookingCard;