import React, { useState } from 'react';
import { People } from '../../interfaces/people-interface';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import './delete-car-modal.css';

export function DisplayCar(car:any) {
    car = car.car
    const [showEdit, toggleShowEdit] = useState(false);
    const [person_id, setPersonId]  = React.useState(null);

    const { handleSubmit, register } = useForm();
    const baseURL = "http://localhost:3000/people/"

    const [showModal, toggleShowModal] = useState(false);

    const defaultPeople:People[] = [];
    const [people, setPeople] : [People[], (people: People[]) => void] = React.useState(defaultPeople);
    let actions:any= [];

    React.useEffect(() => {
        axios
            .get<People[]>(baseURL)
            .then(response => {
                setPeople(response.data);
            })
    }, []);

    people.map((person) => (
        actions.push({ label: person.first_name + ' ' + person.last_name, value: person.id})
    ))

    function updateCar(data:any) {
        axios
            .put(baseURL + car.person_id + '/cars/' + car.id, {
            ...data,
            person_id: person_id
        })

        toggleShowEdit(false);
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
        {!showEdit && <li className="car" key={car.id}>
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
                <input type="number" defaultValue={car.year.toString()} {...register("year", {required: true, min: 1800, maxLength: 4})} />
                <input type="text" defaultValue={car.make} {...register("make", {required: true, maxLength: 100})} />
                <input type="text" defaultValue={car.model} {...register("model", {required: true, maxLength: 100})} />
                <input type="number" defaultValue={car.price.toString()} {...register("price", {required: true, min: 0})} />
                <div className="selectForm">
                    <Select  options={ actions } onChange={onChangeHandler} />
                </div>
                <input type="submit" />
            </form>
            <button onClick={() => toggleShowEdit(false)}>Cancel</button>
        </div>}
    </>);
}