import { useState } from "react"

const Form = ({TodoAdded} : {TodoAdded : Function}) => {

    interface FormTodo {
        title: string,
        text: string,
        status: string
    }

    const[formTodo, setFormTodo] = useState<FormTodo>({title: "", text: "", status: "Ej påbörjad"})


    const sendform = (async (event : any) => {
        event.preventDefault();

        try{
            const response = await fetch("http://localhost:9000/add", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formTodo)
            });
    
            if(!response.ok) {
                throw Error();
            }

            //Rensar formuläret
            setFormTodo({ title: "", text: "", status: "Ej påbörjad" });

            TodoAdded();
        } catch (error){
            throw error;
          }
    })


  return (
    <form onSubmit={sendform}>
        <label htmlFor="title">Rubrik</label>
        <input type="text" name="title" id="title" value={formTodo.title} onChange={(event) => setFormTodo({... formTodo, title: event.target.value})}/>

        <label htmlFor="text">Beskrivning: </label>
        <textarea name="text" id="text" value={formTodo.text} onChange={(event) => setFormTodo({... formTodo, text: event.target.value})}></textarea>

        <label htmlFor="status">Aktuell status:</label>
        <select name="status" id="status" value={formTodo.status} onChange={(event) => setFormTodo({... formTodo, status: event.target.value})}>
            <option>Avklarad</option>
            <option>Ej påbörjad</option>
            <option>Påbörjad</option>
        </select>

        <input type="submit" value="Lägg till" />
    </form>
  )
}

export default Form