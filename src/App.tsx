import { useState, useEffect } from "react"

interface Todo{
  title: String,
  text: String,
  status: String
}


function App() {
  // States för komponenten
  const [todos, setTodos] = useState<Todo | []>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    </>
  )
}

export default App
