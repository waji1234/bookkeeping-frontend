import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

const Dashboard = () => {
  const stats = [
    { title: "Total Applicants", value: 120 },
    { title: "Pending Payments", value: 35 },
    { title: "Resolved Payments", value: 85 },
    { title: "Missing Documents", value: 12 },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container  spacing={3}>
        {stats.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 2,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "translateY(-3px)" },
              }}
            >
              <Typography variant="h6" color="text.secondary">
                {item.title}
              </Typography>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;