import { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import './App.css'
import CustomizedTables from './components/dataTable.tsx'
function App() {
  const [users, setUsers] = useState();

  const data = async () => {
    const promise = await fetch('http://localhost:5000/users');
    const getUsers = await promise.json();
    setUsers(getUsers)
  };
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Barlow, sans-serif',
      ].join(','),
    }
  });



  return (
    <ThemeProvider theme={theme} >
      <CustomizedTables/>
    </ThemeProvider >
   
  )
}

export default App
