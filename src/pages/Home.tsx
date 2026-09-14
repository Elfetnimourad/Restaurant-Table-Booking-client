import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import heroSection from "../images/home-hero-section.png"


const Home = () => {

    return (
        <Box>

            {/* ================= HERO ================= */}
            <Box
                sx={{
                    minHeight: {
                        xs: "40vh",
                        md: "80vh",
                    },
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    backgroundImage:
                        `url(${heroSection})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            maxWidth: 700,
                            color: "white",
                        }}
                    >
                        <Typography
                            variant="overline"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: 2,
                            }}
                        >
                            WELCOME TO RESTRO
                        </Typography>

                        <Typography
                            variant="h2"
                            component="h1"
                       
                            sx={{
                                mt: 1,
                                fontWeight:800,
                                fontSize: {
                                    xs: "2.5rem",
                                    sm: "3.5rem",
                                    md: "4.5rem",
                                },
                            }}
                        >
                            Your table is
                            <br />
                            waiting for you.
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                mt: 3,
                                maxWidth: 600,
                                color: "rgba(255,255,255,.85)",
                                lineHeight: 1.7,
                                fontWeight: 400,
                            }}
                        >
                            Find the perfect table, choose your preferred
                            date and time, and reserve your place in just
                            a few clicks.
                        </Typography>

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row",
                            }}
                            spacing={2}
                            sx={{ mt: 4 }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                href="/tables"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    backgroundColor: "#123D35",
                                    fontWeight: 700,
                                    "&:hover": {
                                        backgroundColor: "#0C2D27",
                                    },
                                }}
                            >
                                Book a Table
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                href="/register"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    color: "white",
                                    borderColor: "white",
                                    fontWeight: 700,
                                    "&:hover": {
                                        borderColor: "white",
                                        backgroundColor:
                                            "rgba(255,255,255,.1)",
                                    },
                                }}
                            >
                                Create Account
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            {/* ================= FEATURES ================= */}
            <Box
                sx={{
                    py: {
                        xs: 7,
                        md: 10,
                    },
                    backgroundColor: "#F7F9F8",
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 6 }}>
                        <Typography
                            variant="h4"
                            sx={{fontWeight:800}}
                            gutterBottom
                        >
                            Simple. Fast. Convenient.
                        </Typography>

                        <Typography
                            color="text.secondary"
                            sx={{fontWeight:600,mx:"auto"}}
                            
                        >
                            Everything you need to make your restaurant
                            reservation simple and stress-free.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "repeat(3, 1fr)",
                            },
                            gap: 3,
                        }}
                    >
                        {/* Feature 1 */}
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                height: "100%",
                            }}
                        >
                            <CardContent
                                sx={{
                                    p: 4,
                                    textAlign: "center",
                                }}
                            >
                                <EventAvailableIcon
                                    sx={{
                                        fontSize: 55,
                                        color: "#123D35",
                                        mb: 2,
                                    }}
                                />

                                <Typography
                                    variant="h6"
                                    sx={{fontWeight:700}}
                                    gutterBottom
                                >
                                    Easy Booking
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                >
                                    Choose your date, time, number
                                    of guests, and book your table
                                    easily.
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* Feature 2 */}
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                height: "100%",
                            }}
                        >
                            <CardContent
                                sx={{
                                    p: 4,
                                    textAlign: "center",
                                }}
                            >
                                <TableRestaurantIcon
                                    sx={{
                                        fontSize: 55,
                                        color: "#123D35",
                                        mb: 2,
                                    }}
                                />

                                <Typography
                                    variant="h6"
                                    sx={{fontWeight:700}}
                                    gutterBottom
                                >
                                    Choose Your Table
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                >
                                    Select a table based on its
                                    capacity and location.
                                </Typography>
                            </CardContent>
                        </Card>

                        {/* Feature 3 */}
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                height: "100%",
                            }}
                        >
                            <CardContent
                                sx={{
                                    p: 4,
                                    textAlign: "center",
                                }}
                            >
                                <AccessTimeIcon
                                    sx={{
                                        fontSize: 55,
                                        color: "#123D35",
                                        mb: 2,
                                    }}
                                />

                                <Typography
                                    variant="h6"
                                    sx={{fontWeight:700}}
                                    gutterBottom
                                >
                                    Manage Reservations
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                >
                                    View your reservations and manage
                                    them from your account.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Container>
            </Box>

            {/* ================= CTA ================= */}
            <Box
                sx={{
                    py: 10,
                    backgroundColor: "#123D35",
                    color: "white",
                }}
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        <RestaurantIcon
                            sx={{
                                fontSize: 55,
                                mb: 2,
                            }}
                        />

                        <Typography
                            variant="h4"
                            sx={{fontWeight:800}}
                            gutterBottom
                        >
                            Ready to reserve your table?
                        </Typography>

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,.8)",
                                mb: 4,
                            }}
                        >
                            Choose your table and make your next
                            restaurant experience special.
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            href="/tables"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                backgroundColor: "white",
                                color: "#123D35",
                                fontWeight: 700,
                                "&:hover": {
                                    backgroundColor: "#F0F0F0",
                                },
                            }}
                        >
                            Explore Tables
                        </Button>
                    </Box>
                </Container>
            </Box>

        </Box>
    );
};

export default Home;