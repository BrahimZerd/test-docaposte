import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import userAddIcon from '../assets/user-plus.png';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

import './addUser.css';




const buttonAddUserModal = () => {
    const [open, setOpen] = useState(false);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };


    return(
        <div className='button-container-modal'>
        <Button onClick={handleOpen}  aria-label="ajouter utilisateur" style={{backgroundColor: '#0000FF', color: '#FFF', height:'44px',borderRadius:'22px', paddingRight:'25px',paddingLeft:'25px', marginBottom:'10px',textAlign:'right', marginLeft: 'auto'}}>
            <AddIcon />
            <span className='text-button-add'> Ajouter un utilisateur </span>
        </Button>
        <Dialog
        
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log(formJson);
            handleClose();
          },
        }}> 
        
        <div className='modal-title-group'>
        <img src={userAddIcon} alt="ajouter utilisateur icone" height={20} width={20}  />

        <DialogTitle borderBottom={'solid 1px #ECECEF'} color={'#00008C'}>Ajouter un utilisateur</DialogTitle>
        </div>
        <DialogContent>
          <div className='dialog-content' style={{display: 'flex', justifyContent:'space-around', color:"#00008C", width:'100%', fontWeight:'500', marginTop:'18px'}}>
            <div style={{display:'flex', flexDirection:'column', width:'45%', marginRight:'50px'}}>
            Nom
          <TextField
            autoFocus
            required
            margin="dense"
            size='small'
           
            id="name"
            name="Nom"
            placeholder='nom'
            type="name"
            variant="outlined"
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
            placeholder='prénom'
            name="prénom"
            type="prénom"
            variant="outlined"
          />
          </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', color:'#00008C', marginTop:'10px'}}>
            Email
          <TextField
            autoFocus
            required
            margin="dense"
            placeholder='input@email.fr'
            size='small'
            id="email"
            name="Email"
            type="email"
            variant="outlined"
          />
          </div>
        </DialogContent>
        
        <DialogActions>
        <div className='container-button-adduser'>
          <Button sx={{color:'primary', marginRight:'30px',letterSpacing:'2,9%',fontFamily:'Montserrat'}} onClick={handleClose}>Annuler</Button>
          <Button sx={{borderRadius:'24px', height:'24px', padding:'20px', backgroundColor:'secondary.main', color:'#FFF'}} type="submit">Ajouter</Button>
        </div>
        </DialogActions>
        <Button className='button-close-icon' sx={{color:'primary', backgroundColor:'#FFF', minWidth:'40px',borderRadius: '8px',fontFamily:'Montserrat'}} onClick={handleClose}>
            <CloseOutlinedIcon/>
        </Button>
        </Dialog>
        
      
        </div>
        
    )

};

export default buttonAddUserModal;