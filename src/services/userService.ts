import axios from "axios";

import type { FormData } from "../components/manageUser";
import { GridRowId } from '@mui/x-data-grid';


const usersUrl = 'http://localhost:5000/users';

export const getUsers = async () => {
    
    try{
        const response = await axios.get(usersUrl,{
            validateStatus: function(status) {
                return status < 201
            }
        })
        return response.data
    }catch (error) {
        console.error("Impossible d'accéder aux utilisateur" ,error)
        throw error
    }};


export const createUser = async (data : FormData) => {
    try{
        const response = await axios.post(usersUrl, data)
        return response.data
    }
    catch(error) {
        console.error("Creation de l'utilisateur impossible", error)
        throw error
    }
}    


export const updateUser = async ( id : GridRowId, data: FormData) => {
    try {
        const response = await axios.put(`${usersUrl}/${id}`, data)
        return response.data
    } catch(error){
        console.error("Modification de l'utilisateur impossible", error)
        throw error
    }
};


export const deleteUser = async ( id: GridRowId) => {
    try {
        const response = await axios.delete(`${usersUrl}/${id}`)
        return response.data
    } catch(error){
        console.error("suppression de l'utilisateur impossible", error)
        throw error
    }
}

