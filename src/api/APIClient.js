import axios from 'axios';
import URLs from '../constants/URLs';

const headers = {headers:{'X-Api-Key':'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c'}}

let APIClient = {
    getToDoList(){
        const url = URLs.GET_TODO;
        return axios.get(url, headers)
        .then((response) => response.data)
        .then((responseJson) => {
            return responseJson;
        })
        .catch(error => {
            console.error('Error getting to do list - ', error);
            return false;
        });
   },

   updateToDo(id){
        let url = URLs.UPDATE_TODO;
        url = url.replace('{toDoID}', id);
        const headers = {'X-Api-Key':'PMAK-5ef63db179d23c004de50751-10300736bc550d2a891dc4355aab8d7a5c', 'Content-Type':'application/json'};
        return axios.patch(url, {isComplete:true},{headers})
        .then((response) => response.data)
        .then((responseJson) => {
            return responseJson;
        })
        .catch(error => {
            console.error('Error updating to do task - ', error);
            return false;
        });
   }
}

export default APIClient;