import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams} from '@mui/x-data-grid';
import { TablePaginationProps, TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import ButtonAddUser from './manageUser.tsx';

import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../services/userService.ts';

import editIcon from '../assets/editIcon.png';

import { useQuery } from '@tanstack/react-query';


import { getUsers } from '../services/userService.ts';

import deleteIcon from '../assets/deleteIcon.png';

import './dataTable.css';

  


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
    const {data : users ,  isLoading,  refetch } = useQuery({ queryKey: ['usersList'], queryFn: getUsers});
    const [isChange, setChange] = useState(false);
    const [isDelete, setDelete] = useState(false);
    const [params, setParams] = useState<GridRowParams>()


    const columns: GridColDef[] = [
      { field: 'firstName', headerName: 'Nom', width: 380, headerClassName: 'columnTextColor'},
      { field: 'lastName', headerName: 'Prénom', width:380, headerClassName: 'columnTextColor' },
      { field: 'email', headerName: 'Email', width: 380, headerClassName: 'columnTextColor' },
      {field:'actions', type:'actions', width: 0, getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<img src={editIcon} alt="modifier utilisateur" />} label='modifier utilisateur' onClick={() => handleChangeUser(params)}/>,
        <GridActionsCellItem icon={<img src={deleteIcon} alt="supprimer utilisateur" />} label='supprimer utilisateur' onClick={() => handleDeleteUser(params)}/>
    ]}
    ];
   
     const handleChangePage = (event:any, newPage:number) => {
      setPage(newPage)
    };

    const handleChangeUser = (id : GridRowParams) => {
      setDelete(false)
      setChange(true)
      setParams(id)
      refetch();

    }
    const handleDeleteUser = (id: GridRowParams) => {
      setChange(false)
      setDelete(true)
      setParams(id)
    }

    const changeRowsPerPage =(event:any) => {
      setRowsPerPage(parseInt(event.target.value,10));
    };

    useEffect(() => {

      getUsers();
    },[users])
    
    return (
      !isLoading ?
      <div>
      
      <ButtonAddUser manageUserTitle={'Ajouter un utilisateur'} deletingUser={false} isOpen={true} addUser={true} buttonText={'Ajouter'}/>
      {isChange && params ?
      <ButtonAddUser 
      params={params}
      addUser={false} 
      manageUserTitle={'Modifier Utilisateur'} 
      deletingUser={false} 
      buttonText={"Modifier"}
      email={params.row.email}
      firstName={params.row.firstName}
      lastName={params.row.lastName}
      userId={params.row.id}
      isOpen={true}
     />
         :
         <></>
    }
     {isDelete && params ?
     <ButtonAddUser 
     addUser={false}
     isOpen={true}
    params={params}
     deletingUser={true} 
     manageUserTitle={'Supprimer utilisateur'} 
     buttonText={"Supprimer"}
     email={params.row.email}
     firstName={params.row.firstName}
     lastName={params.row.lastName}
     userId={params.row.id}
    />
     :
     <></>
    }

    
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
          
          
        />
      </Box>

      </div>
      :
      <div>Loading . . .</div>
        
    );
  }

