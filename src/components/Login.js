import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Divider,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signUpPage = () => {
    navigate('/signup');
  };

  const homePage = async () => {
    try {
      // console.log("Sending login request with data:", data);
      const response = await axios.post("http://localhost:8000/login", data);
      // console.log("Login response:", response);
      localStorage.setItem("token", response.data.token);
      // console.log("Token stored in localStorage:", localStorage.getItem("token"));
      navigate('/home');
      const existingUsers =JSON.parse(localStorage.getItem('Users')) || [];
      const user = existingUsers.find(user => 
        user.email === data.email && user.password === data.password 
      );
      if(user){
        localStorage.setItem('currentUser',JSON.stringify(user))
        navigate('/home')
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        component="form"
        sx={{
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px',
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          border: '1px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3>Log In</h3>
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <FormControl sx={{ m: 1, width: '100%' }}>
          <TextField
            id="outlined-email-input"
            label="Email Address"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            fullWidth
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{ m: 1, width: '100%', borderRadius: '20px' }}
          onClick={homePage}
        >
          Login
        </Button>
        <p style={{ color: 'blue', cursor: 'pointer', margin: '10px 0' }}>Forgot Password?</p>
        <Divider sx={{ width: '100%', mb: 2 }} />
        <Button
          variant="contained"
          sx={{ m: 1, width: '100%', borderRadius: '20px', backgroundColor: '#81c784' }}
          onClick={signUpPage}
        >
          Create New Account
        </Button>
      </Box>
    </Box>
  );
}
