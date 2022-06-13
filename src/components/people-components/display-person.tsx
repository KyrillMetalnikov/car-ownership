import React, { useState } from 'react';
import axios from 'axios';
import { Cars } from '../../interfaces/car-interface';
import { DisplayCar } from '../car-components/display-car';
import { useForm } from 'react-hook-form';

export function DisplayPerson(person:any) {
    interface People {
        first_name: string;
        last_name: string;
        email: string;
        id: number;
        cars: Array<Cars>,
    }

    person = person.person;
    const defaultPeople:People[] = [];

    const { handleSubmit, register } = useForm();
    const [showEdit, toggleShowEdit] = useState(false);
    const [people, setPeople] : [People[], (people: People[]) => void] = React.useState(defaultPeople);
    const [error, setError]: [string, (error: string) => void] = React.useState("");
    const [showModal, toggleShowModal] = useState(false);
    const baseURL = "http://localhost:3000/people/";

    React.useEffect(() => {
        axios
            .get<People[]>(baseURL)
            .then(response => {
                setPeople(response.data);
            })
            .catch(ex => {
                const error = ex.response.status === 404
                    ? "Resource Not found"
                    : "An unexpected error has occured";
                    setError(error);
            });
    }, []);

    function handleClose() { 
        toggleShowModal(false);
    }

    function deletePerson() {
        axios.delete(baseURL + person.id);
        handleClose();
    }

    function updatePerson(data:any) {
        axios
            .put(baseURL + person.id, {
            ...data,
        })

        toggleShowEdit(false);
    }

    return (<>
            {!showEdit && <li className="person" key={person.id}>
                <div className="peopleDetails">
                    <span>{person.first_name} {person.last_name} </span>
                    <span>{person.email}</span>
                </div>
                <button className="edit" onClick={() => toggleShowEdit(true)}>Edit details</button>
                <button className="delete" onClick={() => toggleShowModal(true)}>Delete</button>
                <ul className="cars">
                    {person.cars.map((singleCar:Cars) => (
                        <DisplayCar car={singleCar} />
                    ))}
                </ul>
                {showModal && 
                    <div className="modal">
                        <section className="modal-main">
                            <span>Are you sure you want to delete this person?</span>
                            <button type="button" onClick={deletePerson}>
                                Delete
                            </button>
                            <button type="button" onClick={handleClose}>
                                Cancel
                            </button>
                        </section>
                    </div>}
            
                </li>
            }
                {showEdit && <div className="person">
                    <form onSubmit={handleSubmit(updatePerson)}>
                        <input type="text" defaultValue={person.first_name} {...register("first_name", {required: true, min: 1})} />
                        <input type="text" defaultValue={person.last_name} {...register("last_name", {required: true, maxLength: 100})} />
                        <input type="text" defaultValue={person.email} {...register("email", {required: true, maxLength: 100})} />

                        <input type="submit" />
                    </form>
                    <button onClick={() => toggleShowEdit(false)}>Cancel</button>
                </div>}
        </>)
}
