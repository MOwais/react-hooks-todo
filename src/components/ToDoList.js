import React, { useState, useEffect } from 'react';
import ToDo from './ToDo';
import APIClient from '../api/APIClient';
import Loader from 'react-loader-spinner';

function ToDoList() {

    const [ toDos, setToDos ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    //sort ASC due dates then sort completed tasks at bottom
    const sortToDoList = (a,b) => {
        return a.isComplete - b.isComplete || new Date(a.dueDate) - new Date(b.dueDate)
    }

    const setLoadingForUpdate = () => {
        setLoading(true);
    }

    const handleUpdateToDo = (id) => {
        let updatedToDos = [...toDos];
        let index = toDos.findIndex(toDo => toDo.id === id);
        updatedToDos[index].isComplete = true;
        updatedToDos = updatedToDos.sort(sortToDoList);
        setToDos(updatedToDos);
        setLoading(false);
    }

    useEffect(async() => {
        setLoading(true);
        let toDoListData = await APIClient.getToDoList();
        toDoListData = toDoListData.sort(sortToDoList);
        setToDos(toDoListData);
        setLoading(false);
    }, []);

    return (
        <div>

            {loading ?  
            <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
            />:
            <div>
                <h1>My To Do List</h1>
                <ToDo toDos={toDos} updateToDo={handleUpdateToDo} setLoading={setLoadingForUpdate}/>
            </div>}
        </div>
    );
}

export default ToDoList;

