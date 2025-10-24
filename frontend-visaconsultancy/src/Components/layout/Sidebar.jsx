import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  Tooltip,
   Avatar
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaymentIcon from "@mui/icons-material/Payment";
import DescriptionIcon from "@mui/icons-material/Description";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Applicants", path: "/dashboard/applicants", icon: <PeopleAltIcon /> },
  { label: "Payments", path: "/dashboard/payments", icon: <PaymentIcon /> },
  { label: "Documents", path: "/dashboard/documents", icon: <DescriptionIcon /> },
  { label: "Reports", path: "/dashboard/reports", icon: <BarChartIcon /> },
  { label: "Users", path: "/dashboard/users", icon: <GroupIcon /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "center",
        bgcolor: "#f4f6f8",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            my: 3,
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Bookkeeping
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={NavLink}
              to={item.path}
              end={item.path === "/dashboard"}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                "&.active": {
                  bgcolor: "primary.main",
                  color: "white",
                  "& svg": { color: "white" },
                },
                "&:hover": {
                  bgcolor: "rgba(25, 118, 210, 0.1)",
                },
              }}
            >
              {item.icon}
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 15 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
      
       <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid #ddd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          "&:hover": { opacity: 0.8 },
        }}
        onClick={() => navigate("/dashboard/profile")}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="body1" fontWeight="bold">
            {user?.name || "User Name"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.role || "Role"}
          </Typography>
        </Box>
      </Box>
      <Tooltip title="Logout">
        <IconButton color="error" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </Box>
    </Box>
  );
};

export default Sidebar;