import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
   const {
     title, 
     body, 
     message1,
     message2,
     message3,
     open,
     onClose,
     clickButton
     } = props
    
  return (       
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}<br></br>
            <br></br>
             {message1}<br></br>
              {message2}<br></br>
              {message3}<br></br>
          </DialogContentText>
        </DialogContent>
        <DialogActions>          
          <Button onClick={clickButton} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>    
  );
}

AlertDialog.defaultProps ={
    
}