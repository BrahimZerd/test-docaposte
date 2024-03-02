import axios from "axios";


export const getUsers = async () => {
    
    try{
        const response = await axios.get('http://localhost:5000/users')
        return response.data
    }catch (error) {
        console.error("Impossible d'accéder aux utilisateur" ,error)
        throw error
    }}

