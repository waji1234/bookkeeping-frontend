import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import API from "../../api/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ name: "", password: "" }); 
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", {
        name: form.name,
        password: form.password,
      });

      login(res.data.token);
      toast.success(res.data.message || "Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10} p={3} boxShadow={3} borderRadius={2}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            margin="normal"
            value={form.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>

          <Typography textAlign="center" variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Button onClick={() => navigate("/register")}>Register</Button>
          </Typography>
        </form>
      </Box>
    </Container>
  );
}
