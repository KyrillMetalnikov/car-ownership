import { useState } from 'react';
import { Cars } from '../../interfaces/car-interface';
import { DisplayCar } from '../car-components/display-car';
import { People } from '../../interfaces/people-interface';
import { DeletePerson } from './delete-person';
import { EditPerson } from './edit-person';

export function DisplayPerson(person: People) {
    const [showEdit, toggleShowEdit] = useState(false);
    const [showDeleteModal, toggleShowDeleteModal] = useState(false);


    return (<>
            {!showEdit && <li className="person">
                <div className="peopleDetails">
                    <span>{person.first_name} {person.last_name} </span>
                    <span>{person.email}</span>
                </div>
                <button className="edit" onClick={() => toggleShowEdit(true)}>Edit details</button>
                <button className="delete" onClick={() => toggleShowDeleteModal(true)}>Delete</button>
                <ul className="cars">
                    {person.cars.map((singleCar:Cars) => (
                        <div key={singleCar.id}>
                            <DisplayCar {...singleCar} />
                        </div>
                    ))}
                </ul>
                {showDeleteModal && 
                    <DeletePerson toggle={toggleShowDeleteModal} person={person} />
                }
            
                </li>
            }
                {showEdit && <EditPerson toggle={toggleShowEdit} person={person}/>}
        </>)
}
