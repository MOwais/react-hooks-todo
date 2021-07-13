import React from 'react';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import Moment from 'react-moment';
import APIClient from '../api/APIClient';

function ToDo({ toDos, updateToDo, setLoading }) {

    const handleCompleteTask = async id =>{
        setLoading();
        let data = await APIClient.updateToDo(id);
        if(data.status === 'success'){
            updateToDo(id);
        }
    }

    return toDos.map((toDo, index) => {
        const { dueDate, id, isComplete, description } = toDo;
        let isPastDue = new Date(dueDate) < new Date();
        return(
            <div data-testid={`todo-${id}`} className={isComplete ? 'todo-row complete': isPastDue ? 'todo-row pastdue' : 'todo-row pending'} key={index}>
                <div className={isComplete ? 'icons icons-completed' :'icons icons-pending'}>
                    {toDo.isComplete ? <ImCheckboxChecked/> : <ImCheckboxUnchecked onClick={()=>handleCompleteTask(id)}/>}
                </div>
                <div className='todo-row'>
                    {description}
                </div>
                {dueDate ? <div><Moment format='MM/DD/YYYY'>{dueDate}</Moment></div> : <div>Due Date N/A</div>}
            </div>
        );
    });
}

export default ToDo;

