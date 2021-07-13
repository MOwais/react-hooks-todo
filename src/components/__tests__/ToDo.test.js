import { render, screen, cleanup } from '@testing-library/react';
import ToDo from '../ToDo';

afterEach(()=>{
    cleanup();
});

describe('ToDo Component', () => {
    test('should render to do items', () => {
        const toDoItem = [{id:1, description:'Wash Dishes', isComplete:false, dueDate:'2020-06-26T19:00:00.000Z'}]
        render(<ToDo toDos={toDoItem}/>);
        const toDoEl = screen.getByTestId('todo-1');
        expect(toDoEl).toBeInTheDocument();
        expect(toDoEl).toHaveTextContent(toDoItem[0].description);
    });
    test('should render completed items with completed class', () => {
        const toDoItem = [{id:1, description:'Wash Dishes', isComplete:true, dueDate:'2020-06-26T19:00:00.000Z'}]
        render(<ToDo toDos={toDoItem}/>);
        const toDoEl = screen.getByTestId('todo-1');
        expect(toDoEl).toBeInTheDocument();
        expect(toDoEl).toHaveClass('todo-row complete');
    });
    test('should render pastdue items with pastdue class', () => {
        const toDoItem = [{id:1, description:'Wash Dishes', isComplete:false, dueDate:'2020-06-26T19:00:00.000Z'}]
        render(<ToDo toDos={toDoItem}/>);
        const toDoEl = screen.getByTestId('todo-1');
        expect(toDoEl).toBeInTheDocument();
        expect(toDoEl).toHaveClass('todo-row pastdue');
    });
});

