import {
    Box,
    Container,
    Divider,
    Grid,
    IconButton,
    Link,
    Stack,
    Typography,
} from "@mui/material";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#123D35",
                color: "white",
                mt: "auto",
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={5}
                    sx={{ py: 6 }}
                >
                    {/* Restaurant */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={2}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <RestaurantIcon
                                    sx={{ fontSize: 32 }}
                                />

                                <Typography
                                    variant="h5"
                                    sx={{fontWeight:700}}
                                >
                                    Restro
                                </Typography>
                            </Box>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: "rgba(255,255,255,0.75)",
                                    lineHeight: 1.8,
                                    maxWidth: 350,
                                }}
                            >
                                Discover great food, choose your
                                favorite table, and make your
                                reservation easily.
                            </Typography>

                            {/* Social media */}
                            <Box>
                                <IconButton
                                    sx={{ color: "white" }}
                                    aria-label="Facebook"
                                >
                                    <FacebookIcon />
                                </IconButton>

                                <IconButton
                                    sx={{ color: "white" }}
                                    aria-label="Instagram"
                                >
                                    <InstagramIcon />
                                </IconButton>
                            </Box>
                        </Stack>
                    </Grid>

                    {/* Quick Links */}
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Stack spacing={2}>
                            <Typography
                                variant="h6"
                                sx={{fontWeight:600}}
                            >
                                Quick Links
                            </Typography>

                            <Link
                                href="/"
                                underline="none"
                                color="inherit"
                                sx={{
                                    opacity: 0.75,
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                Home
                            </Link>

                            <Link
                                href="/tables"
                                underline="none"
                                color="inherit"
                                sx={{
                                    opacity: 0.75,
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                Tables
                            </Link>

                            <Link
                                href="/register"
                                underline="none"
                                color="inherit"
                                sx={{
                                    opacity: 0.75,
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                Register
                            </Link>

                            <Link
                                href="/login"
                                underline="none"
                                color="inherit"
                                sx={{
                                    opacity: 0.75,
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                Login
                            </Link>
                        </Stack>
                    </Grid>

                    {/* Customer */}
                    <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                        <Stack spacing={2}>
                            <Typography
                                variant="h6"
                                sx={{fontWeight:600}}
                            >
                                Customer
                            </Typography>

                            <Link
                                href="/my-bookings"
                                underline="none"
                                color="inherit"
                                sx={{
                                    opacity: 0.75,
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                My Bookings
                            </Link>

                            <Link
                                href="/profile"
                                underline="none"
                                color="inherit"
                                sx={{
                                    opacity: 0.75,
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                My Profile
                            </Link>

                            <Link
                                href="/contact"
                                underline="none"
                                color="inherit"
                                sx={{
                                    opacity: 0.75,
                                    "&:hover": {
                                        opacity: 1,
                                    },
                                }}
                            >
                                Contact Us
                            </Link>
                        </Stack>
                    </Grid>

                    {/* Contact */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={2}>
                            <Typography
                                variant="h6"
            
                                sx={{fontWeight:600}}
                            >
                                Contact Us
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                }}
                            >
                                <LocationOnIcon />

                                <Typography variant="body2">
                                    Batna, Algeria
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                }}
                            >
                                <PhoneIcon />

                                <Typography variant="body2">
                                    +213 555 000 000
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                }}
                            >
                                <EmailIcon />

                                <Typography variant="body2">
                                    contact@restro.com
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider
                    sx={{
                        borderColor:
                            "rgba(255,255,255,0.15)",
                    }}
                />

                {/* Bottom */}
                <Box
                    sx={{
                        py: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: "rgba(255,255,255,0.65)",
                        }}
                    >
                        © {new Date().getFullYear()} Restro.
                        All rights reserved.
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={3}
                    >
                        <Link
                            href="/privacy"
                            underline="none"
                            sx={{
                                color: "rgba(255,255,255,0.65)",
                                "&:hover": {
                                    color: "white",
                                },
                            }}
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            underline="none"
                            sx={{
                                color: "rgba(255,255,255,0.65)",
                                "&:hover": {
                                    color: "white",
                                },
                            }}
                        >
                            Terms
                        </Link>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;