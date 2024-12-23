
import { Badge, Button } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import { Delete, Add} from "../components/PopUps";

const initialState={
  openSnackbar:false,
  snackbarMessage:"",
    columns:[
        { field: 'serialNo', headerName: 'SrNo', width: 200,headerAlign:'center', align:'center' },
        { field: 'name', headerName: 'Name', width: 400, headerAlign:'center',align:'center',
          renderCell: (params) => (
            <div >
              {params.value}
              {!params.row.isActive && (
                <Badge color="error" variant="dot" sx={{ marginLeft: 1 }} />
              )}
            </div>
          ),
         },
        { field: 'salary', headerName: 'Salary', type: 'number', width: 200,headerAlign:'center', align:'center' },
        {
          field: 'action',
          headerName: 'Action',
          type: 'number',
          width: 400,
          headerAlign:'center',
          align:'center',
          renderCell: (params) => (
            <>
            <Button
              sx={{backgroundColor:'transparent'}}
            //   onClick={() => handleAction(params.row)}
            >
              <Add employeeID={params.row.id} isActive={false} option={false} initialEmployeeDetails={params.row}/>
              </Button>
              <Button
              sx={{backgroundColor:'transparent'}}>
              <Delete employeeID={params.row.id}/>
            </Button>
            </>
          )
        },
      ],
      
    rows :[],
}


export const employeeSlice=createSlice({
    name:'Work',
    initialState,
    reducers:{
      addDetails: (state, action) => {
        // state.rows.push(action.payload);
        //  Ensure employees have sequential SrNo
        // state.rows.forEach((employee, index) => {
        //   employee.SrNo = index + 1;
        // });
        // const storedData=localStorage.setItem('employees',JSON.stringify(state.rows))
        // console.log(storedData)
        state.openSnackbar=true;
        state.snackbarMessage="Employee added Successfully";
      },
      deleteDetails: (state, action) => {
        // const id=action.payload;
        // // console.log(id)
        // const newEmployee=JSON.parse(localStorage.getItem('employees'));
        // const index = state.rows.findIndex(employee => employee.id === id);
        // newEmployee.splice(index,1)
        // // console.log(deletedEmployee)
        // localStorage.setItem('employees',JSON.stringify(newEmployee))
        // state.rows=state.rows.filter(employee=> employee.id !== id)
        // // console.log(state.rows)
        // state.rows.forEach((employee,index)=>{
        //   employee.SrNo=index+1;
        //   // console.log(state.rows)
        // }) 
        state.openSnackbar=true
        state.snackbarMessage="Employee Deleted Succeddfully";
        
      },
      updateDetails: (state, action) => {
        // const {id,updatedEmployee }= action.payload;
        // console.log(updatedEmployee)
        // const index = state.rows.findIndex(employee => employee.id === id);
        // if (index !== -1) {
        //   state.rows[index] = {...state.rows[index],...updatedEmployee}
        // }
        // state.rows.forEach((employee,index)=>{
        //   employee.SrNo=index+1
        // })
        // localStorage.setItem('employees',JSON.stringify(state.rows))
        state.openSnackbar=true;
        state.snackbarMessage="Employee Updated Successfully";
      },
      employeeList:(state,action)=>{
        state.rows=action.payload.map((employee,index)=>({
          ...employee,
          serialNo: index+1
        }
        ))
      },
      closeSnackbar:(state)=>{
        state.openSnackbar=!state.openSnackbar;
        state.snackbarMessage=""
      },
      contactDetails:(state)=>{
        state.openSnackbar=true
        state.snackbarMessage='Response Submitted'
      }
  }
  })
export const {addDetails,deleteDetails,updateDetails,employeeList,closeSnackbar,contactDetails}=employeeSlice.actions
export default employeeSlice.reducer
