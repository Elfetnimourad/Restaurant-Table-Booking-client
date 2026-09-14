import { useState } from "react";
import restrauntImage from '../images/reastraunt-image.png'
import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
    Restaurant,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<{name: string;email: string;password: string;confirmPassword: string;}>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed"
                );
            }

            console.log("Registration successful:", data);
            navigate("/login")
            // Later:
            // save token
            // redirect to tables/home

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

    return (
        <Container
            maxWidth="md"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: 4,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    overflow: "hidden",
                    borderRadius: 3,
                }}
            >
                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                >
                    {/* Left side */}
                    <Box
                        sx={{
                            width: {
                                xs: "100%",
                                md: "45%",
                            },
                            minHeight: 550,
                            backgroundImage:
                                `url(${restrauntImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            p: 4,
                            color: "white",
                        }}
                    >
                        <Stack spacing={1}>
                            <Restaurant fontSize="large" />

                            <Typography
                                variant="h4"

                                sx={{fontWeight:700}}
                            >
                                Join Restro
                            </Typography>

                            <Typography variant="body1">
                                Create your account and start
                                booking your favorite tables.
                            </Typography>
                        </Stack>
                    </Box>

                    {/* Right side */}
                    <Box
                        sx={{
                            flex: 1,
                            p: {
                                xs: 3,
                                md: 5,
                            },
                        }}
                    >
                        <Stack spacing={3}>
                            <Box>
                                <Typography
                                    variant="h4"
                                    
                                    sx={{fontWeight:700}}
                                    gutterBottom
                                >
                                    Register
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Fill in your information
                                </Typography>
                            </Box>

                            {error && (
                                <Alert severity="error">
                                    {error}
                                </Alert>
                            )}

                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                            >
                                <Stack spacing={2.5}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword
                                                                )
                                                            }
                                                            edge="end"
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOff />
                                                            ) : (
                                                                <Visibility />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        value={
                                            formData.confirmPassword
                                        }
                                        onChange={handleChange}
                                        required
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                setShowConfirmPassword(
                                                                    !showConfirmPassword
                                                                )
                                                            }
                                                            edge="end"
                                                        >
                                                            {showConfirmPassword ? (
                                                                <VisibilityOff />
                                                            ) : (
                                                                <Visibility />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        disabled={loading}
                                        sx={{
                                            py: 1.5,
                                            fontWeight: 700,
                                            backgroundColor:
                                                "#123D35",
                                            "&:hover": {
                                                backgroundColor:
                                                    "#0C2D27",
                                            },
                                        }}
                                    >
                                        {loading
                                            ? "Creating account..."
                                            : "Register"}
                                    </Button>
                                </Stack>
                            </Box>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{textAlign:"center"}}
                            >
                                Already have an account?{" "}
                                <Typography
                                    component="span"
                                    color="primary"
                                    sx={{
                                        cursor: "pointer",
                                        fontWeight: 600,
                                    }}
                                    onClick={()=>navigate("/login")}
                                >
                                    Login
                                </Typography>
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Register;