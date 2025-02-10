const Todo = ({todo, onUpdate} : {todo: any, onUpdate: Function}) => {

    const statusColor = todo.status === "Ej påbörjad" ? "#E63946" : todo.status === "Påbörjad" ? "#F4D35E" : "#4CAF50"
    const updateTodo = async (event : any) =>{
      let newStatus = event.target.value;

      const newTodo = {...Todo, status: newStatus};

      try{
        const response = await fetch("http://localhost:9000/update/" + todo._id, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newTodo)
        });

        if(!response.ok) {
            throw Error();
        }

        onUpdate();
      } catch (error){
        throw error;
      }
    }

  return (
    <div className="Todo-Card" style={{ borderLeft: `5px solid ${statusColor}` }}>
        <h2>{todo.title}</h2>
        <p>{todo.text}</p>
        <p style={{color: statusColor}}>{todo.status}</p>

        <form>
            <label htmlFor="status">Ändra status:</label>
            <select name="status" id="status" defaultValue={todo.status} onChange={updateTodo}>
                <option>Avklarad</option>
                <option>Påbörjad</option>
                <option>Ej påbörjad</option>
            </select>
        </form>
    </div>
  )
}

export default Todo