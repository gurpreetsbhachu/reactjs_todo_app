import { useEffect, useState } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import List from './component/List';

function App() {

  //Get data from Localstorage
  const getLocalStorageData = () => {
    let task = localStorage.getItem('task_list');

    if(task){
      return JSON.parse(localStorage.getItem('task_list'));
    }else{
      return [];
    }
  }

  const [task, setTask] = useState("");
  const [todolist, setTodolist] = useState(getLocalStorageData());
  const [error, setError] = useState("");

  const addTask = () => {
  if(task.length > 0){
    setError('')
    const newTodoItem = {
      id: uuidv4(),
      item: task,
      done: false,
    };
    setTodolist([...todolist, newTodoItem]);
    setTask("");
  }else{
    setError('Please add a task.')
  }
  }

  const handleKeyDown = e => {
  if (e.keyCode === 13) {
    addTask();
  }
};

  const handleToggle = (itemId) => {
    const newTodoList = todolist.map((listItem) => {
      if(listItem.id === itemId){
        return {...listItem, done: !listItem.done}
      }
      return listItem
    })
    setTodolist(newTodoList);
  };

  const handleDelete = (itemId) => {
    const newTodoList = todolist.filter((listItem) => listItem.id !== itemId);
    setTodolist(newTodoList);
  }

  //add task to local storage
  useEffect(() => {
    localStorage.setItem('task_list', 
    JSON.stringify(todolist))
  }, [todolist]);

  return (
    <div className="container">
      <div className="row">
        <div className="col pt-5 pb-5 mt-5">
          <div className="user-input w-50">
            <input type="text" 
            className='form-control rounded-4' 
            placeholder='Add task to the list'
            value={task} 
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}/>
            <span onClick={addTask}><i className="bi bi-plus-circle-fill"></i></span>
          </div>
          <p className='text-center text-light'>{error}</p>

          {todolist.length > 0 && (<List todolist={todolist} handleToggle={handleToggle} handleDelete={handleDelete} />)}
        </div>
      </div>
    </div>
  )
}

export default App
