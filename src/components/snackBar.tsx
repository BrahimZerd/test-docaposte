import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type snackBarTypes = {
    message : string,
    icon: any,
    title: string
}

export default function CustomizedSnackbars({message, title,icon} : snackBarTypes) {
    const [open, setOpen] = React.useState(true);
  
     const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    return (
      <div>
        <Snackbar  open={open} autoHideDuration={1900} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >
          <Alert
            
            variant="filled"
            sx={{ width: '100%', boxShadow: 2,  backgroundColor:'#FFFFFF', color: '#666D92', '& .MuiAlert-icon':{ display:'none'}}}
          >
              <div style={{display:'flex', textAlign:'left', gap:'8px'}}>
                {icon}
                <h1 style={{color: "#00008C", fontSize:'14px', textAlign:'left'}}>{title}</h1>
              </div>
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
  }