import { useState, useEffect } from "react"
import Todo from "./components/Todo"
import Form from "./components/Form"

interface Todo{
  _id: any,
  title: String,
  text: String,
  status: String
}


function App() {
  // States för komponenten
  const [todos, setTodos] = useState<Todo[] | []>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:9000");

      if (!response.ok) {
        throw Error("Kunde inte hämta datan " + response.status);
      }

      const data = await response.json();
      setTodos(data);

    } catch(error) {
      setError("Kunde inte hämta data från API");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <h1>Att Göra lista:</h1>

      {loading && <p>Laddar...</p>}
      {error && <p>{error}</p>}

      <div className="Form-container">
       <Form TodoAdded={fetchTodos}/>
      </div>

      <div className="Todo-container">
        {
          todos && todos.map((todo) => {
            return <Todo todo={todo} key={todo._id} onUpdate={fetchTodos}/>
          })
        }
      </div>

    </>
  )
}

export default App
