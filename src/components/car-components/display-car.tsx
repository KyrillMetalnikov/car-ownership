import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import './delete-car-modal.css';
import { useAppSelector } from '../../app/hooks';
import { selectPeople } from '../../store/peopleSlice';
import { isEmptyObject } from '../../utils/utils';

export function DisplayCar(car:any) {
    car = car.car
    const [showEdit, toggleShowEdit] = useState(false);

    const { handleSubmit, register, formState: { errors } } = useForm();
    const baseURL = "http://localhost:3000/people/"

    const [showModal, toggleShowModal] = useState(false);
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
            toggleShowEdit(false);
        }
    }

    function deleteCar() {
        axios.delete(baseURL + car.person_id + '/cars/' + car.id);
        handleClose();
    }

    const onChangeHandler = (change:any) => {
        setPersonId(change.value)
    }

    function handleClose() { 
        toggleShowModal(false);
    }

    return(<>
        {!showEdit && <li className="car">
            {car.year + ' '}
            {car.make + ' '}
            {car.model + ' '}
            ${car.price}
            <button className="edit" onClick={() => toggleShowEdit(true)}>Edit details</button>
            {showModal && 
                <div className="modal">
                    <section className="modal-main">
                        <p>Are you sure you want to delete this car?</p>
                        <button type="button" onClick={deleteCar}>
                            Delete
                        </button>
                        <button type="button" onClick={handleClose}>
                            Cancel
                        </button>
                    </section>
                </div>}
            <button className="delete" onClick={() => toggleShowModal(true)}>Delete</button>
        </li>}
        {showEdit && <div className="car">
            <form onSubmit={handleSubmit(updateCar)}>
                <input type="number" defaultValue={car.year.toString()} {...register("year", {required: true, min: 0, maxLength: 4})} />
                <input type="text" defaultValue={car.make} {...register("make", {required: true, maxLength: 100})} />
                <input type="text" defaultValue={car.model} {...register("model", {required: true, maxLength: 100})} />
                <input type="number" defaultValue={car.price.toString()} {...register("price", {required: true, min: 0})} />
                <div className="selectForm">
                    <Select  options={ actions } onChange={onChangeHandler} defaultValue={ actions[peopleIndex] }/>
                </div>
                <input type="submit" />
                {!isEmptyObject(errors) && <div className="error">Missing values or year/price is less than 0</div>}
            </form>
            <button onClick={() => toggleShowEdit(false)}>Cancel</button>
        </div>}
    </>);
}