import React, { useState } from 'react';
import axios from 'axios';
import { Cars } from '../../interfaces/car-interface';
import { DisplayPerson } from './display-person';

export function DisplayPeople() {
    interface People {
        first_name: string;
        last_name: string;
        email: string;
        id: number;
        cars: Array<Cars>,
    }

    const defaultPeople:People[] = [];

    const [showEdit, toggleShowEdit] = useState(false);
    const [people, setPeople] : [People[], (people: People[]) => void] = React.useState(defaultPeople);
    const [error, setError]: [string, (error: string) => void] = React.useState("");
    const [showModal, toggleShowModal] = useState(false);
    const baseURL = "http://localhost:3000/people";

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

    function deletePerson(id:number) {
        axios.delete(baseURL + id);
        handleClose();
    }

    return (
        <div className="App">
         <ul className="peoples">
           {people.map((person) => (
                <DisplayPerson person={person} />
           ))}
        </ul>
        </div>
    )
}
