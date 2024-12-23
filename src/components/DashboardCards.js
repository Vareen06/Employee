import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from "@mui/material";

export default function DashboardCards({ props }) {
  return (
    <Grid container spacing={2}>
      {props.map((card, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} >
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.alt}
                sx={{ objectFit: 'cover' }} 
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
