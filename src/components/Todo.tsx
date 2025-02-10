import React from 'react'

const Todo = ({todo} : {todo: any}) => {

    const statusColor = todo.status === "Ej påbörjad" ? "#E63946" : todo.status === "Påbörjad" ? "#F4D35E" : "#4CAF50"


  return (
    <div className="Todo-Card">
        <h2>{todo.title}</h2>
        <p>{todo.text}</p>
        <p style={{color: statusColor}}>{todo.status}</p>
    </div>
  )
}

export default Todo