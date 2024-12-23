import React from 'react';
import {
    createBrowserRouter,
    RouterProvider
  } from "react-router-dom";
import Home from '../components/Home';
import PageNotFound from '../components/PageNotFound';
import ContactUs from '../pages/ContactUs';
import Employee from '../pages/Employee';
import SignUp from '../components/SignUp';
import  Login  from '../components/Login';

 export const router = createBrowserRouter([
    {
      path:"/",
      element:<Login />
    }, 
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/contactus",
      element: <ContactUs />,
    },
    {
      path: "/employee",
      element: <Employee />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    }
  ]);
  
export default function Routes() {
    
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

