import { Button } from "@mui/material";
import docaposteLogo from '../assets/Docaposte.png';
import logoutIcon from '../assets/log-out.png';
import { useNavigate } from "react-router-dom";



export const HeaderConnection = () => {
    const navigate = useNavigate();

    const deconnect = () => {
        localStorage.removeItem('User');
        navigate('/')
    }
    return(
        <header>
            <div style={{display:'flex', fontFamily:'Montserrat', fontWeight:'600', color:'primary.main' ,backgroundColor: '#FFF', height:'64px', justifyContent:'space-between', position: 'fixed', top:'0%', left:'0', width:'100%'}}>
                <img src={docaposteLogo} alt="logo Docaposte" width={96} height={32} style={{marginTop:'15px', marginLeft:'15px'}}/>
                <Button onClick={deconnect} sx={{display:'flex', justifyContent:'space-around', width:'150px', marginRight:'25px'}}>
                    <img src={logoutIcon} height={20} width={20} />
                    <h5 style={{fontSize:'14px'}}> Déconnexion </h5>
                </Button>
            </div>
        </header>
    )
}