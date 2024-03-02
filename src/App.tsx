import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import './App.css'
import CustomizedTables from './components/dataTable.tsx'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient} >
      <ThemeProvider theme={theme} >
        <CustomizedTables/>
      </ThemeProvider >
    </QueryClientProvider>
   
  )
}

export default App
