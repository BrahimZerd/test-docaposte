import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams} from '@mui/x-data-grid';
import { TablePaginationProps, TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import deleteIcon from '../assets/deleteIcon.png';
import editIcon from '../assets/editIcon.png';


const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'Nom', width: 300, headerClassName: 'columnTextColor'},
    { field: 'lastName', headerName: 'Prénom', width:300, headerClassName: 'columnTextColor' },
    { field: 'email', headerName: 'Email', width: 300, headerClassName: 'columnTextColor' },
    {field:'actions', type:'actions', getActions: (params: GridRowParams) => [
      <GridActionsCellItem icon={<img src={editIcon} width={20} height={20} onClick={() => console.log(params)}alt="modifier utilisateur" />}  label="Delete" />,
      <GridActionsCellItem icon={<img src={deleteIcon}  width={20} height={20} alt="supprimer utilisateur" />}  label="Delete" />
]}
 ];


const customPagination = (props : TablePaginationProps) => {

  const { count, page, rowsPerPage, onPageChange, onRowsPerPageChange } = props;
  
  return (
    <CustomTablePagination
      style={{color: '#00008C', display: 'flex', width:'100%'}}
      count={count}
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
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
      const promise = await fetch('http://localhost:5000/users');
      const getUsers = await promise.json();
      setUsers(getUsers)
  };
    const handleChangePage = (event:any, newPage:number) => {
      setPage(newPage)
    }
    const changeRowsPerPage =(event:any) => {
      setRowsPerPage(parseInt(event.target.value,10));
      
    }
  useEffect(() => {

    getUsers();
  },[])
    const totalPages = Math.ceil(users.length/rowsPerPage);
  
    return (
        <Box
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
              page: page,
              pageSize: rowsPerPage,
            }}
          
          autoPageSize
          slots={{
           pagination: customPagination,
          }}
          slotProps={
            {
              pagination:{page: page,count: totalPages,rowsPerPage: rowsPerPage, onRowsPerPageChange:changeRowsPerPage, onPageChange:handleChangePage}
            }
          }
         style={{color:'gray'}}
          
          
        />}
      </Box>
    );
  }

  const CustomTablePagination = styled(TablePagination)(
    () => `
    .MuiTablePagination-spacer {
      width: 0px;
      display: none;
    }

    .MuiToolbar-root {
      display: flex;
      width: 100%;
      margin:0px;
      padding: 0px;
      padding-left:10px;
      
    }

    .MuiTablePagination-actions{
      display: flex;
      position: absolute;
      right: 0;
      gap: -2px;
    }

    .MuiTablePagination-actions > button:nth-of-type(2) {
      flex-grow: 2;
      margin-right: 89px;
    }

    .MuiButtonBase-root {
      color: #00008C;
    }

    .MuiTablePagination-selectLabel{
      font-weight: 400;
    }

    .MuiTablePagination-displayedRows{
      font-weight: 400;
      font-size: 14px;
      position: absolute;
      right: 9.5%;
    }
    `
  );