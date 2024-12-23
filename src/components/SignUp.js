import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  IconButton,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
  Link,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Typography,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "axios";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });
  const [check, setCheck] = useState(false);
  const [value, setValue] = useState(dayjs());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleCheckChange = (e) => {
    setCheck(e.target.checked);
  };

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const LoginPage = async () => {
    if (
      data.password.length >= 8 &&
      data.firstName &&
      data.lastName &&
      data.email &&
      data.password &&
      data.gender &&
      check
    ) {
      await axios.post('http://localhost:8000/userCreated', data);
      navigate("/login");
      const existingUsers = JSON.parse(localStorage.getItem("Users")) || [];
      const updatedUers = [...existingUsers, data ];
      localStorage.setItem("Users", JSON.stringify(updatedUers));
    } else {
      setData({
        ...data,
        password: "",
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#e0f7fa',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        component="form"
        sx={{
          textAlign: 'center',
          width: '100%',
          maxWidth: '500px',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #00796b',
          borderRadius: '10px',
          bgcolor: '#ffffff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2, color: '#00796b' }}>
          Sign Up
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          It's Quick and Easy
        </Typography>
        <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
          <TextField
            fullWidth
            id="outline-required"
            label="First Name"
            name="firstName"
            onChange={handleInputChange}
            value={data.firstName}
          />
          <TextField
            fullWidth
            id="outline-required"
            label="Last Name"
            name="lastName"
            onChange={handleInputChange}
            value={data.lastName}
          />
        </Box>
        <FormControl sx={{ m: 1, width: '100%', mt: 2 }}>
          <TextField
            fullWidth
            id="outlined-email-input"
            label="Email Address"
            name="email"
            value={data.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
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
            label="New Password"
            fullWidth
          />
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{ m: 1, width: '100%' }}
            label="Date of Birth"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
        <FormControl sx={{ m: 1, width: '100%', mt: 2 }}>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            value={data.gender}
            onChange={handleInputChange}
            name="gender"
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        <FormControlLabel
          required
          control={<Checkbox />}
          label="I Agree to Terms and Conditions"
          checked={check}
          onChange={handleCheckChange}
        />
        <Button
          variant="contained"
          sx={{ m: 1, width: '100%', mt: 2, backgroundColor: '#00796b', color: '#ffffff' }}
          onClick={LoginPage}
          disabled={!check}
        >
          Submit Details
        </Button>
        <Divider sx={{ width: '100%', mt: 2 }} />
        <Typography sx={{ mt: 2 }}>
          Already have an Account?{' '}
          <Link href="/login" sx={{ color: '#00796b', fontWeight: 'bold' }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
