import { useState, useEffect } from "react"

interface Todo{
  title: String,
  text: String,
  status: String
}


function App() {
  // States för komponenten
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <h1>Att Göra lista:</h1>
    </>
  )
}

export default App
