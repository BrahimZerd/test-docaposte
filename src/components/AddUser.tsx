import {  useState, useCallback } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"


import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import editIcon from '../assets/editIcon.png';

import userAddIcon from '../assets/user-plus.png';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


import './addUser.css';

type FormData = {
firstName: string
lastName: string
email: string
}



const buttonAddUserModal = (props : any) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    defaultValues:{
      email: "",
      firstName:'',
      lastName:''
    }
  });
  const {
    register,
    handleSubmit,
    watch,
    reset
    } = form;

  const handleOpen = () => {
    setOpen(true);
  };

  
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit= (data : FormData) => {
    console.log(data);
    handleClose();
    reset();
  };
    
    return(
      
        <div className='button-container-modal'>
          {props.addUser? 
        <Button onClick={() => setOpen(props.isTrue)}  aria-label="ajouter utilisateur" style={{backgroundColor: '#0000FF', color: '#FFF', height:'44px',borderRadius:'22px', paddingRight:'25px',paddingLeft:'25px', marginBottom:'10px',textAlign:'right', marginLeft: 'auto'}}>
            <AddIcon />
            <span className='text-button-add'> Ajouter un utilisateur </span>
        </Button>
        :
        <Button onClick={() => setOpen(props.isTrue)}  aria-label="modifier utilisateur" >
            <img src={editIcon} width={20} height={20} alt="icone modifier utilisateur" />
        </Button>
          }
        <Dialog
        
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit)
           
          
        }}> 
        
        <div className='modal-title-group'>
          {props.addUser ?
        <img src={userAddIcon} alt="ajouter utilisateur icone" height={20} width={20}  />
        :
        <img src={editIcon} width={20} height={20} alt="icone modifier utilisateur" />
          }


        <DialogTitle borderBottom={'solid 1px #ECECEF'} color={'#00008C'}>{props.addUserTitle}</DialogTitle>
        </div>
        <DialogContent>
          <div className='dialog-content' style={{display: 'flex', justifyContent:'space-around', color:"#00008C", width:'100%', fontWeight:'500', marginTop:'18px'}}>
            <div style={{display:'flex', flexDirection:'column', width:'45%', marginRight:'50px'}}>
            Nom
          <TextField
            placeholder={props.firstName ? props.firstName : 'Nom'}
            id="name"
            margin="dense"
            size='small'
            type="firstName"
            {...register('firstName')}
          />
            </div>
            <div style={{display:'flex', flexDirection:'column', width:'45%'}}>
            Prénom
          <TextField
           
            autoFocus
            required
            margin="dense"
            size='small'
            id="prénom"
            placeholder={props.lastName ? props.lastName : 'prénom'}
            type="prénom"
            variant="outlined"
            {...register('lastName')}
          />
          </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', color:'#00008C', marginTop:'10px'}}>
            Email
          <TextField
           
            autoFocus
            required
            margin="dense"
            placeholder={props.email ? props.email :'input@email.fr'}
            size='small'
            id="email"
            type="email"
            variant="outlined"
            {...register('email')}
          />
          </div>
        </DialogContent>
        
        <DialogActions>
        <div className='container-button-adduser'>
          <Button sx={{color:'primary', marginRight:'30px',letterSpacing:'2,9%',fontFamily:'Montserrat'}} onClick={handleClose} type="reset">Annuler</Button>
          <Button sx={{borderRadius:'24px', height:'24px', padding:'20px', backgroundColor:'secondary.main', color:'#FFF'}} type="submit">{props.buttonAddUserText}</Button>
        </div>
        </DialogActions>
        <Button className='button-close-icon' sx={{color:'primary', backgroundColor:'#FFF', minWidth:'40px',borderRadius: '8px',fontFamily:'Montserrat'}} type="reset" onClick={handleClose}>
            <CloseOutlinedIcon/>
        </Button>
        </Dialog>
        
      
        </div>
        
    )

};

export default buttonAddUserModal;