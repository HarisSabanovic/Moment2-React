import { useState } from "react"
import * as Yup from "yup";

const Form = ({TodoAdded} : {TodoAdded : Function}) => {

    interface FormTodo {
        title: string,
        text: string,
        status: string
    }

    interface FormError {
        title?: string,
        text?: string,
    }

    const[formTodo, setFormTodo] = useState<FormTodo>({title: "", text: "", status: "Ej påbörjad"})
    const[errors, setErrors] = useState<FormError>({})


    //Validerings schema
    const validationSchema = Yup.object({
        title: Yup.string().min(3).required("Fyll i vad det är du ska göra"),
        text: Yup.string().max(200, "Du får max skriva 200 karaktärer"),
        status: Yup.string().required()
    })

    const sendform = (async (event : any) => {
        event.preventDefault();
        try{
            
            await validationSchema.validate(formTodo, {abortEarly: false});
            
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

            setErrors({});
        } catch (error){
            const validationErrors: FormError = {};

            if(error instanceof Yup.ValidationError) {
                error.inner.forEach(error => {
                    const prop = error.path as keyof FormError;

                    validationErrors[prop] = error.message;
                })

                setErrors(validationErrors);
            }
          }
    })


  return (
    <form onSubmit={sendform}>
        <label htmlFor="title">Uppgift:</label>
        <input type="text" name="title" id="title" value={formTodo.title} onChange={(event) => setFormTodo({... formTodo, title: event.target.value})}/>

        {errors.title && <p>{errors.title}</p>}

        <label htmlFor="text">Beskrivning: </label>
        <textarea name="text" id="text" value={formTodo.text} onChange={(event) => setFormTodo({... formTodo, text: event.target.value})}></textarea>

        {errors.text && <p>{errors.text}</p>}


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