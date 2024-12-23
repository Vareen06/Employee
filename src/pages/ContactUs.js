// ContactUs.js
import React from "react";
import Layout from "../components/Layout";
import { Box, Paper } from "@mui/material";
import {  styled } from "@mui/material/styles";
import { TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  contactDetails
} from "../pages/employeeSlice";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: 800,
  height: 550,
  lineHeight: "60px",
}));

export default function ContactUs() {
  const dispatch=useDispatch();

 
  return (
    <Box
      sx={{
        paddingTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 600,
      }}
    >
      <Layout />
      <Item square={false} elevation={3}>
        {
          <>
            <Typography variant="h4" component="h1" sx={{ paddingTop: 2 }}>
              Contact Us
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              sx={{ width: "90%" }}
              margin="normal"
            />
            <TextField
              label="Email Address"
              type='email'
              variant="outlined"
              sx={{ width: "90%" }}
              margin="normal"
            />
            <TextField
              label="Mobile Number"
              type="number"
              variant="outlined"
              sx={{ width: "90%" }}
              margin="normal"
            />
            <TextField
              label="Issues Faced"
              variant="outlined"
              sx={{ width: "90%" }}
              margin="normal"
              multiline
              rows={4}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: "85%" }}
              onClick={()=>dispatch(contactDetails())}
            >
              Submit
            </Button>
          </>
        }
      </Item>
    </Box>
  );
}
