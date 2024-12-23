import React, {  } from "react";
import PropTypes from "prop-types";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import { Button,TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addDetails,
  deleteDetails,
  updateDetails
} from "../pages/employeeSlice";
import { employeeList} from '../pages/employeeSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import  axios  from 'axios';



export const Add = ({
  option,
  employeeID,
  isActive,
  initialEmployeeDetails,
}) => {

  const [openAdd, setOpenAdd] = React.useState(false);
  const [employeeDetails, setEmployeeDetails] = React.useState({
    SrNo:0,
    name: "",
    salary: "",
    isActive: isActive,
  });
  const dispatch = useDispatch();
  

  const handleOpenAdd = () => {
    // console.log(initialEmployeeDetails)
    setOpenAdd(true);
     !option && initialEmployeeDetails && (
      setEmployeeDetails(initialEmployeeDetails)
      // console.log(employeeDetails)
     )
  };
  const handleCloseAdd = () => setOpenAdd(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployeeDetails({
      ...employeeDetails,
      [name]: type === "checkbox" ? checked : value,
    });
    // console.log(employeeDetails);
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/read");
      const dataWithId =response.data.map((employee)=>({
        ...employee
      }))
      dispatch(employeeList(dataWithId))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleSubmit = async () => {
    try{
      if(option){
        await axios.post('http://localhost:8000/create',employeeDetails)
        dispatch(addDetails())
      }else{
        await axios.patch('http://localhost:8000/update',{...employeeDetails, id:employeeID})
        dispatch(updateDetails())
      }
      setEmployeeDetails({
        id:null,
        SrNo: 0,
        name: "",
        salary: "",
        isActive: isActive,
      })
      handleCloseAdd();
      getData();
    }catch(err){
      console.error(err)
    }

  };

  return (
    <div>
      <div>
        <TriggerButton onClick={handleOpenAdd} sx={{color:'#2196f3'}}>
          {option ? "Add Employee" : <EditIcon/>}
        </TriggerButton>
        
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openAdd}
          onClose={handleCloseAdd}
          closeAfterTransition
          slots={{ backdrop: StyledBackdrop }}
        >
          <Fade in={openAdd}>
            <ModalContent sx={style}>
              <div style={closeIconStyle}>
                <IconButton onClick={handleCloseAdd}>
                  <CloseIcon />
                </IconButton>
              </div>
              <h2 id="transition-modal-title" className="modal-title">
                {option ? "Add Employee Details" : "Update Details"}
              </h2>
              <br />
              <p
                id="transition-modal-description"
                className="modal-description"
              >
                <TextField
                  id="outlined-basic"
                  name="name"
                  label="Enter Employees Name"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={employeeDetails.name}
                />
              </p>
              <p>
                <TextField
                  id="outlined-basic"
                  name="salary"
                  type="number"
                  label="Enter Employees Salary"
                  variant="outlined"
                  fullWidth
                  value={employeeDetails.salary}
                  onChange={handleChange}
                />
              </p>
              <FormControlLabel
                required
                control={
                  <Checkbox
                    checked={employeeDetails.isActive}
                    onChange={handleChange}
                    name="isActive"
                  />
                }
                label="Is Active"
                
              />
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={()=>{handleCloseAdd()}}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Confirm
                </Button>
                
              </div>
            </ModalContent>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export const Delete = ({ employeeID }) => {
  const [openDelete, setOpenDelete] = React.useState(false);
  // const [openSn, setOpenSn] = React.useState(false);
  // const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const dispatch = useDispatch();
  const handleCloseDelete = () => setOpenDelete(false);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/read");
      const dataWithId =response.data.map((employee)=>({
        ...employee
      }))
      dispatch(employeeList(dataWithId))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSubmitDel = async() => {
    console.log(`Deleting employee with ID: ${employeeID}`); // Log employeeID
    try {
      await axios.delete(`http://localhost:8000/delete/${employeeID}`);
      dispatch(deleteDetails()); 
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting employee:', error); // Log any errors
    }
    getData()
  };
  
  return (
    <>
      <TriggerButton onClick={() => setOpenDelete(true)} sx={{color:'#ef5350'}}><DeleteIcon /> </TriggerButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={openDelete}>
          <ModalContent sx={style}>
            <div style={closeIconStyle}>
              <IconButton onClick={() => setOpenDelete(false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <br />
            <h2 id="transition-modal-title" className="modal-title">
              Are You Sure You Want To Delete This Employee
            </h2>
            <br />
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button variant="outlined" onClick={() => setOpenDelete(false)}>
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={handleSubmitDel}>
                Confirm
              </Button>
            </div>
          </ModalContent>
        </Fade>
      </Modal>
      
    </>
  );
};
const closeIconStyle = {
  position: "absolute",
  top: 8,
  right: 8,
};

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

Add.propTypes = {
  option: PropTypes.bool.isRequired,
  employeeDetails: PropTypes.object.isRequired,
  setEmployeeDetails: PropTypes.func.isRequired,
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

const TriggerButton = styled(Button)(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }
  `
);
