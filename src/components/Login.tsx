import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMutation } from "@tanstack/react-query";
import { getUser } from "../services/userService";

import { Navigate, useNavigate } from "react-router-dom";


import {useForm} from 'react-hook-form'
import type { User } from "../services/userService";


type LoginForm = {
    email : string,
    password: string,
}

export default function SignIn() {
    const navigate = useNavigate();
    const form = useForm<LoginForm>({
    defaultValues:{
    email: "",
    password:'',
    }
  });

  const {register, handleSubmit } = form;

  const loginMutation = useMutation({
    mutationFn:(user: User) => {
        console.log(user)
        return getUser(user)
    }
  })


  const onSubmit = (user : any) => {
    localStorage.setItem('User', JSON.stringify(user))
    return navigate('/users')
   
  };

  return (
    <Container component="main" maxWidth="xs" >
      <Box
        sx={{  
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: '#FFF',
          width: '414px',
          height:'443px',
          borderRadius: '10px',
          '& .MuiInputBase-root' :{
            borderRadius: '8px'
          },
          '& .MuiBox-root ': {
            alignItems: 'self-start !important'
          },
          '& .MuiFormControl-root': {
            marginTop: '8px !important'
          },
          '& .MuiFormControlLabel-root' : {
            marginLeft: '-65px'
          }

        }}
      >
        <Typography component="h1" variant="h5" sx={{marginTop:'35px',fontSize:'36px',fontWeight:'600',textAlign:'left',mr:'55px',fontFamily:'Montserrat', color:'#666D92'}}>
          Accéder à <br></br><span style={{color:'#0000FF'}}>Tuto-React</span>
        </Typography>
        <Box component="form"  onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, fontWeight:'500' }}>
            <div style={{textAlign:'left', color:'#0000FF'}}>
            Email
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Email"
            autoComplete="email"
            autoFocus
            {...register('email')}
          />
          </div>
          <div style={{textAlign:'left', color:'#0000FF', gap:'-10px', display: 'flex', flexDirection:'column'}}>
            Mot de passe
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="mot de passe"
            placeholder="******"
            autoFocus
            {...register('password')}
          />
          </div>
          <FormControlLabel
          sx={{color:'primary.main', textAlign: 'left'}}
            control={<Checkbox value="souvenir" color="primary" />}
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height:'44px', borderRadius: '25px', backgroundColor:'secondary.main', fontFamily:'Montserrat' }}
          >
           Connexion
          </Button>
          
          
        </Box>
      </Box>
    </Container>
  );
}