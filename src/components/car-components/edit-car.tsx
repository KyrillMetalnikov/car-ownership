import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { useAppSelector } from "../../app/hooks";
import { UpdateCarProps } from "../../interfaces/props/update-car-props";
import { selectPeople } from "../../store/peopleSlice";
import { baseURL, isEmptyObject } from "../../utils/utils";

export function EditCar({toggle, car}: UpdateCarProps) {
    const { handleSubmit, register, formState: { errors } } = useForm();

    let people = useAppSelector(selectPeople);
    
    let actions:any= [];

    people.map((person) => (
        actions.push({ label: person.first_name + ' ' + person.last_name, value: person.id})
    ))
    const peopleIndex = actions.findIndex((action: any) => action.value===car.person_id);
    const [person_id, setPersonId]  = React.useState(actions[peopleIndex].value);

    function updateCar(data:any) {
        axios
            .put(baseURL + car.person_id + '/cars/' + car.id, {
            ...data,
            person_id: person_id
        })

        if (isEmptyObject(errors)) {
            toggle(false);
        }
    }


    const onChangeHandler = (change:any) => {
        setPersonId(change.value)
    }

    
    
    return(
        <div className="car">
            <form onSubmit={handleSubmit(updateCar)}>
                <input type="number" defaultValue={car.year.toString()} {...register("year", {required: true, min: 0, maxLength: 4})} />
                <input type="text" defaultValue={car.make} {...register("make", {required: true, maxLength: 100})} />
                <input type="text" defaultValue={car.model} {...register("model", {required: true, maxLength: 100})} />
                <input type="number" defaultValue={car.price.toString()} {...register("price", {required: true, min: 0})} />
                <div className="selectForm">
                    <Select options={ actions } onChange={onChangeHandler} defaultValue={actions[peopleIndex] }/>
                </div>
                <input type="submit" />
                {!isEmptyObject(errors) && <div className="error">Missing values or year/price is less than 0</div>}
            </form>
            <button onClick={() => toggle(false)}>Cancel</button>
        </div>
    )
}