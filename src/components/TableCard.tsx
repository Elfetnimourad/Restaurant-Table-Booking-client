import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material";

import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export interface Table {
    id: number;
    table_number: number;
    capacity: number;
    location: string;
    available?: boolean;
    status?:string | null;
}

interface TableCardProps {
    table: Table;
    onBook?: (table: Table) => void;
}

const TableCard = ({
    table,
    onBook,
}: TableCardProps) => {
    const isAvailable = table.status === null ? true : false;

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                height: "100%",
                transition: "0.2s",

                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
        >
            {/* Table image / icon area */}
            <Box
                sx={{
                    height: 180,
                    backgroundColor: "#F3F5F4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TableRestaurantIcon
                    sx={{
                        fontSize: 90,
                        color: "#123D35",
                    }}
                />
            </Box>

            <CardContent>
                <Stack spacing={2}>

                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{fontWeight:700}}
                        >
                            Table {table.table_number}
                        </Typography>

                        <Chip
                            label={
                                isAvailable
                                    ? "Available"
                                    : "Booked"
                            }
                            color={
                                isAvailable
                                    ? "success"
                                    : "error"
                            }
                            size="small"
                        />
                    </Box>

                    {/* Capacity */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <PeopleIcon
                            fontSize="small"
                            color="action"
                        />

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Up to {table.capacity}{" "}
                            {table.capacity === 1
                                ? "person"
                                : "people"}
                        </Typography>
                    </Box>

                    {/* Location */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <LocationOnIcon
                            fontSize="small"
                            color="action"
                        />

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {table.location}
                        </Typography>
                    </Box>

                    {/* Book button */}
                    <Button
                        fullWidth
                        variant="contained"
                        disabled={!isAvailable}
                        onClick={() => onBook?.(table)}
                        sx={{
                            mt: 1,
                            py: 1.2,
                            backgroundColor: "#123D35",
                            fontWeight: 600,

                            "&:hover": {
                                backgroundColor: "#0C2D27",
                            },
                        }}
                    >
                        {isAvailable
                            ? "Book Table"
                            : "Unavailable"}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default TableCard;