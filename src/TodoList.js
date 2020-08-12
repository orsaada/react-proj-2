import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo}) {
    return (
        todos.map(todo => {
            return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
            // the key able to rerender only the component which changed
        })
        // <div>
        //     { todos.length }

        //     {/* Hello World */}
        // </div>
    )
}
