import React, { useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
// import logo from './logo.svg';
// import './App.css';
// import uuidv4 from 'uuid/v4'

const { v4: uuidv4 } = require('uuid');


//key var - no matters the var name/value
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]) //the parameter for the function is the default state (array of todos)
  const todoNameRef = useRef()

  // get
  //to load our todos, want to call it once, when the components loads
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
    }, [])


  // store
  //each time array change this function will be callled
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) //add item
  }, [todos])

  //change the complete toggle, get the id of the todo
  function toggleTodo(id) {
    // new list - copy of the todo list,
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  //parameter an event
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete:false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  // the first element 'todos' is all the todos and the second is a function to update the todos.
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      {/* pass the todos to the todolist - it's called propes*/ }
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
