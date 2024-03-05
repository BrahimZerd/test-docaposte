import {  useEffect, useState } from 'react';
import { useForm } from "react-hook-form"

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import editIcon from '../assets/editIcon.png';
import deleteUserIcon from '../assets/user-minus.png'


import userAddIcon from '../assets/user-plus.png';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CustomizedSnackbars from './snackBar';

import { useMutation } from '@tanstack/react-query';
import { createUser, deleteUser } from '../services/userService';
import { updateUser } from '../services/userService';

import { HeaderConnection } from './Header';


import './manageUser.css';

export type FormData = {
firstName: string
lastName: string
email: string
}

//Form & buttons pour gérer les entrées formulaires + calls api & renvoi de valeurs pour refresh les users

const ButtonManageUser = (props : any) => {

  const { addUser, deletingUser, buttonText, onUpdateRows , isOpen, manageUserTitle, userId, params } = props
  const [open, setOpen] = useState(!isOpen);
  
  const newUser = useMutation({
    mutationFn: (newUser: FormData) => {
      return createUser(newUser)
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: () => {
      return deleteUser(userId)
    }
  })
  const updateMutation = useMutation({
    mutationFn: (user: FormData) => {
      return updateUser(userId, user)
    }
  })
  
 

  useEffect(() =>  {
    //récupération des paramètres au click, ouverture de la modale correspondant à l'endroit clicker avec les parametres de l'utilisateur
    if(params !== undefined) {
      setOpen(true);
    }
  },[params])



  const form = useForm<FormData>({
    defaultValues:{
      email: "",
      firstName:'',
      lastName:''
    }
  });

  const {register, handleSubmit, reset } = form;

  
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit= (data : FormData) => {
    //submit conditionnel du formulaire / selon le bouton clicker, l'execution API sera différente
    if(addUser) 
    {
      newUser.mutate(data)
      onUpdateRows(true)
    } 
    else if(deletingUser)
    {
      deleteUserMutation.mutate(userId)
      onUpdateRows(true)
    } 
    else 
    {
      updateMutation.mutate(data)
      onUpdateRows(true)
    }
    handleClose();
    reset();
  };


    return(
      <>
  <HeaderConnection />
  <div className='button-container-modal'>
    {/*j'utilise updateMutation en cas de succes ou d'échec pour afficher la snackbar et les informations voulues */}
    {updateMutation.isSuccess && 
      <CustomizedSnackbars
        title='Succès'
        icon={<CheckCircleRoundedIcon color={'success'} style={{marginTop:'3px'}}/>}
        message="L'utilisateur a été modifié avec succès"
      />
    }
    {updateMutation.isError && 
      <CustomizedSnackbars
        title='Echec'
        icon={<CancelRoundedIcon color={'error'} style={{marginTop:'3px'}}/>}
        message="La modification de l'utilisateur a échoué"
      />
    }
    {addUser ? 
      <Button onClick={() => setOpen(isOpen)}  aria-label="ajouter utilisateur" style={{backgroundColor: '#0000FF', color: '#FFF', height:'44px',borderRadius:'22px', paddingRight:'25px',paddingLeft:'25px', marginBottom:'10px',textAlign:'right', marginLeft: 'auto'}}>
        <AddIcon />
        <span className='text-button-add'> Ajouter un utilisateur </span>
      </Button>
      : <></>
    }
    {newUser.isSuccess &&
      <CustomizedSnackbars
        title='Succès'
        icon={<CheckCircleRoundedIcon color={'success'} style={{marginTop:'3px'}}/>}
        message="L'utilisateur a été ajouté avec succès"
      />
    }
    {newUser.isError &&
      <CustomizedSnackbars
        title='Echec'
        icon={<CancelRoundedIcon color={'error'} style={{marginTop:'3px'}}/>}
        message="L'ajout de l'utilisateur a échoué"
      />
    }
    {deleteUserMutation.isSuccess &&
      <CustomizedSnackbars
        title='Succès'
        icon={<CheckCircleRoundedIcon color={'success'} style={{marginTop:'3px'}}/>}
        message="L'utilisateur a été supprimé avec succès"
      />
    }
    {deleteUserMutation.isError &&
      <CustomizedSnackbars
        title='Echec'
        icon={<CancelRoundedIcon color={'error'} style={{marginTop:'3px'}}/>}
        message="La suppression de l'utilisateur a échoué"
      />
    }

    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(onSubmit),
        id: 'Formulaire'
      }}
    > 
      {/*Le formulaire suit les conditions adduser/modifier ou delete, selon la condition les informations du formulaire et les call api sont différents */}

      <div className='modal-title-group'>
        {addUser ?
          <img src={userAddIcon} alt="ajouter utilisateur icone" height={20} width={20}  />
          : deletingUser ?
          <img src={deleteUserIcon} width={20} height={20} alt="icone supprimer utilisateur" />
          :
          <img src={editIcon} width={20} height={20} alt="icone modifier utilisateur" />
        }
        <DialogTitle borderBottom={'solid 1px #ECECEF'} color={'#00008C'}>{manageUserTitle}</DialogTitle>
      </div>
      {!deletingUser ?
        <DialogContent>
          <div className='dialog-content' style={{display: 'flex', justifyContent:'space-around', color:"#00008C", width:'100%', fontWeight:'500', marginTop:'18px'}}>
            <div style={{display:'flex', flexDirection:'column', width:'45%', marginRight:'50px'}}>
              Nom
              <TextField
                placeholder={props.firstName ? props.firstName : 'Nom'}
                id="name"
                margin="dense"
                size='small'
                type="nom"
                {...register('lastName')}
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
                {...register('firstName')}
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
        :
        <div style={{padding:'32px', color:'#00008C', fontSize:'16px'}}>
          <p>
            Vous êtes sur le point de supprimer un utilisateur. Cette action est irréversible. Souhaitez-vous confirmer ?
          </p>
        </div>
      }
      <DialogActions>
        <div className='container-button-adduser'>
          <Button sx={{color:'primary', marginRight:'30px',letterSpacing:'2,9%',fontFamily:'Montserrat'}} onClick={handleClose} type="reset">Annuler</Button>
          <Button sx={{borderRadius:'24px', height:'24px', padding:'20px', backgroundColor:`${deletingUser ? '#D82A2A' : 'primary.main'}`, color:'#FFF'}} type="submit">{buttonText}</Button>
        </div>
      </DialogActions>
      <Button className='button-close-icon' sx={{color:'primary', backgroundColor:'#FFF', minWidth:'40px',borderRadius: '8px',fontFamily:'Montserrat'}} type="reset" onClick={handleClose}>
        <CloseOutlinedIcon/>
      </Button>
    </Dialog> 
  </div>
</>
    )

};

export default ButtonManageUser;