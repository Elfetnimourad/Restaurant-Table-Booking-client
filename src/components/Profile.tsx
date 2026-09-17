import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Avatar, Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import ShieldIcon from "@mui/icons-material/Shield";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../context/authContext";

const Profile = () => {
  const { userData } = useAuth();
const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: 395,
          minHeight: 450,
          p: 5,
          backgroundColor: "#080F1C",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Avatar sx={{ width: 80, height: 80 }}>
            {userData?.name[0].toUpperCase()}
          </Avatar>
        </Box>

        <CardContent
          sx={{
            display: "grid",
            gap: 1.5,
            p: 0,
            color: "white",
            textAlign:"start"
          }}
        >
          {/* Name */}
          <Box
            sx={{
              height: 70,
              border: "1px solid #223250",
              borderRadius: 3,
              backgroundColor: "#111C2D",
              px: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <AccountCircleIcon />
            <Box>
              <Typography variant="caption" color="gray">
                Name
              </Typography>
              <Typography>
                {userData?.name}
              </Typography>
            </Box>
          </Box>

          {/* Email */}
          <Box
            sx={{
              height: 70,
              border: "1px solid #223250",
              borderRadius: 3,
              backgroundColor: "#111C2D",
              px: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <EmailIcon />
            <Box>
              <Typography variant="caption" color="gray">
                Email
              </Typography>
              <Typography>
                {userData?.email || "email@example.com"}
              </Typography>
            </Box>
          </Box>

          {/* Password */}
          <Box
  sx={{
    height: 70,
    border: "1px solid #223250",
    borderRadius: 3,
    backgroundColor: "#111C2D",
    px: 2,
    display: "flex",
    alignItems: "center",
    gap: 2,
  }}
>
  <LockIcon />

  <Box sx={{ flex: 1 }}>
    <Typography variant="caption" color="gray">
      Password
    </Typography>

    <Typography>
      {showPassword ? userData?.password : "••••••••••"}
    </Typography>
  </Box>

  <Box
    onClick={() => setShowPassword((prev) => !prev)}
    sx={{
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    }}
  >
    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
  </Box>
</Box>

          {/* Role */}
          <Box
            sx={{
              height: 70,
              border: "1px solid #223250",
              borderRadius: 3,
              backgroundColor: "#111C2D",
              px: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ShieldIcon />
            <Box>
              <Typography variant="caption" color="gray">
                Role
              </Typography>
              <Typography>
                {userData?.role || "Customer"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;