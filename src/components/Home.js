import React from "react";
import Cards from "./Cards";
import Layout from "./Layout";
import { Box } from "@mui/material";


export default function Home() {

  return (
    <div>
    <Layout />
    <Box sx={{paddingLeft:30,paddingTop:10}}>
      <Cards />
    </Box>
      </div>
  );
}
