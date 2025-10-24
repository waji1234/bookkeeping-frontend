import { useState } from "react";
import { TextField, Button, Container, Typography, Box, MenuItem } from "@mui/material";
import API from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User", 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", form);
      toast.success(res.data.message || "User registered successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        mt={8}
        p={4}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Register New User
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Role"
            name="role"
            fullWidth
            margin="normal"
            value={form.role}
            onChange={handleChange}
            helperText="Select a role for this user"
          >
            <MenuItem value="Super_admin">Super Admin</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Employee">Employee</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </TextField>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
          <Typography textAlign="center" variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Button onClick={() => navigate("/login")}>Login</Button>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}