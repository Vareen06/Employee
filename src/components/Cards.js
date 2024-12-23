import React from "react";
import DashboardCards from "./DashboardCards";

const card = [
  {
    title: "Products",
    description: "Description for card 1",
    image: 'https://imgs.search.brave.com/ep0QDislQOTsTwOJQyuuIRfjW1_flRx7nbvtPSZaOZo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC80emZjMDdv/bTUwbXkvN3pacjhM/Z3V0YUNUbEh4MXJy/TUNKcS9kZWY5Yjg0/MGVlYjI4YzQ4OWZm/MDY1OTA0YzkxNzll/Yi9HdWlkZS1Qcm9k/dWN0LVR5cGVzLnBu/Zz93PTc1MCZoPTUx/MiZxPTkwJmZtPXBu/ZyZiZz10cmFuc3Bh/cmVudA',
    alt: "Products",
  },
  {
    title: "Chat",
    description: "Description for card 2",
    image: "https://imgs.search.brave.com/9sFwuITWTDO7DEwbWgYFhfgKgg5AYsEpnfmoOUOAm08/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTUx/MzQ2MzEzOC9waG90/by9mZWVkYmFjay1j/b25jZXB0LXVzZXIt/Y29tbWVudC1yYXRp/bmctb25saW5lLXdy/aXRpbmctZmVlZGJh/Y2stcmV2aWV3Lndl/YnA_Yj0xJnM9MTcw/NjY3YSZ3PTAmaz0y/MCZjPVNjRm4xSzF3/Y3VGNFhTSGJlVExC/T2N4ZEFWSGZ5Q19s/M2NkV0RYQUl3a3M9",
    alt: "Chat",
  },
  {
    title: "Business",
    description: "Description for card 3",
    image: "https://imgs.search.brave.com/1OPk2ve8YOOUGOzz2xnn1LkEeodYxWGLjWfw-ieX9f4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtcGxhdGZvcm0u/OTlzdGF0aWMuY29t/Ly9HZXpoeWZUMF9V/V2JVWjBhZ3JBOFM0/Q0kzMjQ9LzU0MHgy/NDQ6MTIwNng5MTAv/Zml0LWluLzUwMHg1/MDAvcHJvamVjdHMt/ZmlsZXMvMzgvMzgy/MS8zODIxOTYvMmMx/MzQ4ZTYtM2M1OS00/YWQ1LWFhNWQtYzAy/MWQ3YTY2NWJiLmpw/Zw",
    alt: "Business",
  },
  {
    title: "Statistics",
    description: "Description for card 4",
    image: "https://imgs.search.brave.com/7NWJhxXJFfKzo2wzphfjItzMMy7Vg7N0fMPphl6mq5o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1wc2QvYnVz/aW5lc3Mtc3RhdGlz/dGljcy1iYXItZ3Jh/cGhfNTM4NzYtMTIw/NTUuanBnP3NpemU9/NjI2JmV4dD1qcGc",
    alt: "Statistics",
  },
  {
    title: "Analysis",
    description: "Description for card 4",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYV285Kl3PM9Eum_u0F1ZD_RTX-huzlACQBw&s",
    alt: "Analysis",
  },
];

export default function Cards() {
  return <DashboardCards props={card} />;
}
