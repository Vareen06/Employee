import { IconButton, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeSnackbar } from '../pages/employeeSlice'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
export default function ComSnackbar({open,onClose,message}) {
    const dispatch=useDispatch()
    const openSnackbar=useSelector((state)=>state.employee.openSnackbar)
    const snackbarMessage=useSelector((state)=>state.employee.snackbarMessage)

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        dispatch(closeSnackbar())
      };
      
    const action = (
      <React.Fragment>
          <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  
  return (
    <div>
        <Snackbar
      open={openSnackbar}
      autoHideDuration={5000}
      onClose={()=>handleClose}
      message={snackbarMessage}
      action={action}
      anchorOrigin={{ vertical:'top', horizontal:'right' }}
    />
        
    </div>
  )
}

ComSnackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
  };
  