import React,{useEffect} from "react";
import Layout from "../components/Layout";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector,useDispatch } from "react-redux";
import { Add } from "../components/PopUps";
import { employeeList } from "./employeeSlice";
import axios from "axios";

export default function Employee() {
  const state = useSelector((state) => state.employee);
  const dispatch=useDispatch()

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/read");
      dispatch(employeeList(response.data))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(()=>{
  // const table=localStorage.getItem('employees')
  getData()
  // console.log(table)
  // if(table){
  //   dispatch(employeeList(JSON.parse(table)))
  // }
  },[])
  
  
  return (
    <Box sx={{ paddingLeft: 28, paddingTop: 10 }}>
      <Layout />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 5,
        }}
      >
        <h3>Employees</h3>
        <Add option={true} isActive={true}/>
      </Box>
      <div style={{display:'flex', justifyContent:'space-evenly'}}>
      
        <DataGrid
          rows={state.rows}
          columns={state.columns} 
          initialState={{
          pagination:{
            paginationModel:{page:0, pageSize:5},
          }
          }}
          pageSizeOptions={[5,10]}
        />
      </div>
      
    </Box>
  );
}
