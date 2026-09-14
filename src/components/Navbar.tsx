import { useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/authContext";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] =
        useState<null | HTMLElement>(null);

    // Temporary values
    // Later these will come from AuthContext
    const {userData,authenticated} = useAuth();
console.log("userData from Navbar",userData)
    const handleMobileMenu = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleUserMenu = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const navigation = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Tables",
            path: "/tables",
        },
    ];

    if (authenticated) {
        navigation.push({
            name: "My Bookings",
            path: "/my-bookings",
        });
    }

    if (
        authenticated &&
        userData?.role === "admin"
    ) {
        navigation.push({
            name: "Admin",
            path: "/admin",
        });
    }

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "#123D35",
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 70,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Logo */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <RestaurantIcon
                            sx={{ fontSize: 30 }}
                        />

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: 0.5,
                            }}
                        >
                            Restro
                        </Typography>
                    </Box>

                    {/* Desktop navigation */}
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        {navigation.map((item) => (
                            <Button
                                key={item.path}
                                href={item.path}
                                sx={{
                                    color: "white",
                                    px: 2,
                                    textTransform: "none",
                                    fontSize: 16,
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255,255,255,0.1)",
                                    },
                                }}
                            >
                                {item.name}
                            </Button>
                        ))}

                        {!authenticated ? (
                            <>
                                <Button
                                    href="/login"
                                    sx={{
                                        color: "white",
                                        textTransform: "none",
                                    }}
                                >
                                    Login
                                </Button>

                                <Button
                                    href="/register"
                                    variant="contained"
                                    sx={{
                                        ml: 1,
                                        backgroundColor:
                                            "white",
                                        color: "#123D35",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        "&:hover": {
                                            backgroundColor:
                                                "#f0f0f0",
                                        },
                                    }}
                                >
                                    Register
                                </Button>
                            </>
                        ) : (
                            <>
                                <IconButton
                                    onClick={handleUserMenu}
                                    sx={{
                                        color: "white",
                                        ml: 1,
                                    }}
                                >
                                    <Avatar>{userData?.name[0][0].toUpperCase()}</Avatar>
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={
                                        handleCloseUserMenu
                                    }
                                >
                                    <MenuItem
                                        onClick={
                                            handleCloseUserMenu
                                        }
                                    >
                                        Profile
                                    </MenuItem>

                                    <MenuItem
                                        onClick={
                                            handleCloseUserMenu
                                        }
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>

                    {/* Mobile button */}
                    <IconButton
                        onClick={handleMobileMenu}
                        sx={{
                            display: {
                                xs: "flex",
                                md: "none",
                            },
                            color: "white",
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </Container>

            {/* Mobile drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleMobileMenu}
            >
                <Box
                    sx={{
                        width: 260,
                        pt: 2,
                    }}
                >
                    <List>
                        {navigation.map((item) => (
                            <ListItem
                                key={item.path}
                                disablePadding
                            >
                                <ListItemButton
                                    component="a"
                                    href={item.path}
                                    onClick={
                                        handleMobileMenu
                                    }
                                >
                                    <ListItemText
                                        primary={item.name}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}

                        {!authenticated ? (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component="a"
                                        href="/login"
                                        onClick={
                                            handleMobileMenu
                                        }
                                    >
                                        <ListItemText
                                            primary="Login"
                                        />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton
                                        component="a"
                                        href="/register"
                                        onClick={
                                            handleMobileMenu
                                        }
                                    >
                                        <ListItemText
                                            primary="Register"
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText
                                            primary="Profile"
                                        />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText
                                            primary="Logout"
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;