import { useState } from "react";
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
import loginPage from "../images/login-page.jpg"
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            console.log("Login successful:", data);
            localStorage.setItem("id",data?.user?.id);

            // Later:
            // save token
            // update AuthContext
            // redirect user
        navigate("/")
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
                                `url(${loginPage})`,
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
                                Welcome Back
                            </Typography>

                            <Typography variant="body1">
                                Sign in to continue booking your
                                favorite restaurant tables.
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
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Stack
                            spacing={3}
                            sx={{ width: "100%" }}
                        >
                            <Box>
                                <Typography
                                    variant="h4"
                                   sx={{fontWeight:700}}

                                    gutterBottom
                                >
                                    Login
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Enter your email and password
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

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent:
                                                "flex-end",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                            sx={{
                                                cursor: "pointer",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Forgot password?
                                        </Typography>
                                    </Box>

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
                                            ? "Logging in..."
                                            : "Login"}
                                    </Button>
                                </Stack>
                            </Box>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{textAlign:"center"}}
                            >
                                Don't have an account?{" "}
                                <Typography
                                    component="span"
                                    color="primary"
                                    sx={{
                                        cursor: "pointer",
                                        fontWeight: 600,
                                    }}
                                    onClick={()=>navigate("/register")}
                                >
                                    Register
                                </Typography>
                            </Typography>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Login;