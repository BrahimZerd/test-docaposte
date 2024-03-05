import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import './App.css'

import CustomizedTables from './components/dataTable.tsx'
import Login from './components/Login.tsx'

import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const queryClient = new QueryClient();

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
        main: '#D82A2A'
      }
    },
  });



  return (
    <QueryClientProvider client={queryClient} >
      
      <ThemeProvider theme={theme} >
        <Router>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/users" element={<CustomizedTables />} /> 
          </Routes>
        </Router>
      </ThemeProvider >
      
    </QueryClientProvider>
   
  )
}

export default App
