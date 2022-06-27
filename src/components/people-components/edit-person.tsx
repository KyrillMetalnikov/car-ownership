import axios from "axios";
import { useForm } from "react-hook-form";
import { UpdatePersonProps } from "../../interfaces/props/update-person-props";
import { baseURL, isEmptyObject } from "../../utils/utils";

export function EditPerson({toggle, person}: UpdatePersonProps) {
    const { handleSubmit, register, formState: { errors } } = useForm();
    
    function updatePerson(data:any) {
        axios
            .put(baseURL + person.id, {
            ...data,
        })

        toggle(false);
    }

    return(<div className="person">
                    <form onSubmit={handleSubmit(updatePerson)}>
                        <input type="text" defaultValue={person.first_name} {...register("first_name", {required: true, min: 1})} />
                        <input type="text" defaultValue={person.last_name} {...register("last_name", {required: true, maxLength: 100})} />
                        <input type="text" defaultValue={person.email} {...register("email", {required: true, maxLength: 100})} />

                        <input type="submit" />
                        {!isEmptyObject(errors) && <div className="error">All values must be filled out</div>}
                    </form>
                    <button onClick={() => toggle(false)}>Cancel</button>
                </div>
    )
}