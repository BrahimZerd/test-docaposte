import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import './App.css'
import CustomizedTables from './components/dataTable.tsx'
import ButtonAddUser from './components/AddUser.tsx'
function App() {
  
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Barlow, sans-serif, Montserrat',
      ].join(','),
    },
    palette: {
      primary: {
        main: '#00008C',
      },
      secondary:{
        main: '#0000FF'
      },
      error: {
        main: '#ECECEF'
      }
    },
  });



  return (
    <ThemeProvider theme={theme} >
      <ButtonAddUser />
      <CustomizedTables/>
    </ThemeProvider >
   
  )
}

export default App
