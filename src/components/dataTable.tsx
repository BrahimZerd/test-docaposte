import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService.ts';
import { useQuery } from '@tanstack/react-query';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams} from '@mui/x-data-grid';
import { TablePaginationProps, TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import ButtonAddUser from './AddUser.tsx'

import deleteIcon from '../assets/deleteIcon.png';

import './dataTable.css';




const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'Nom', width: 380, headerClassName: 'columnTextColor'},
    { field: 'lastName', headerName: 'Prénom', width:380, headerClassName: 'columnTextColor' },
    { field: 'email', headerName: 'Email', width: 380, headerClassName: 'columnTextColor' },
    {field:'actions', type:'actions', width: 0, getActions: (params: GridRowParams) => [
      <ButtonAddUser 
      user={false} 
      addUserTitle={'Modifier Utilisateur'} 
      isTrue={true} 
      buttonAddUserText={"Modifier"}
      email={params.row.email}
      firstName={params.row.firstName}
      lastName={params.row.lastName}
      
      />,
      <GridActionsCellItem icon={<img src={deleteIcon}  width={20} height={20} style={{padding:'5px',marginRight:'5px'}} alt="icone supprimer utilisateur" />}  label="Supprimer utilisateur" />
]}
 ];


const customPagination = (props : TablePaginationProps ) => {

  const { count, page, rowsPerPage, onPageChange, onRowsPerPageChange } = props;
  
  return (
    <TablePagination
      style={{color: '#00008C', display: 'flex', width:'100%'}}
      count={count}
      component='div'
      page={page}
      labelRowsPerPage='Élements par page:'
      labelDisplayedRows={({ from, count }) => `Page ${from} sur ${count}`}
      rowsPerPageOptions={[5,10,20]}
      onRowsPerPageChange={onRowsPerPageChange}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      showFirstButton={true}
      showLastButton={true}
       />
      
  );
};



export default function DataTable() {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const {data : users , error,  isLoading } = useQuery({ queryKey: ['users'], queryFn: getUsers})


  

    

   

     

    const handleChangePage = (event:any, newPage:number) => {
      setPage(newPage)
    };


    const changeRowsPerPage =(event:any) => {
      setRowsPerPage(parseInt(event.target.value,10));
    };

    useEffect(() => {

      getUsers();
    },[])
    

    return (
      !isLoading ?
      <div>
      <ButtonAddUser addUserTitle={'Ajouter un utilisateur'} isTrue={true} addUser={true} buttonAddUserText={'Ajouter'}/>
 
        <Box
        component='div'
        sx={{
          height: '100%',
          width: '100%',
          '& .columnTextColor': {
            color: '#00008C',
            fontSize: '15px',
          },
        }}
      >
        {users &&
        <DataGrid
        
        
        sx={{
          '& .MuiTableFooter-root':{
            display:'flex',
            width: '15px' 
          }
        }}
          rows={users}
          columns={columns}
          rowCount={users.length}
          paginationModel={{
              page: 0,
              pageSize: rowsPerPage,
            }}
          
          
          slots={{
           pagination: customPagination,
          }}
          slotProps={
            {
              pagination:{component:'div', page: page ,count: Math.ceil(users.length/rowsPerPage),rowsPerPage: rowsPerPage, onRowsPerPageChange:changeRowsPerPage, onPageChange:handleChangePage}
            }
          }
         style={{color:'#666D92'}}
          
          
        />}
      </Box>
      </div>
      :
      <div>Loading . . .</div>
        
    );
  }

  