import { useState } from 'react';
import { DeleteCar } from './delete-car';
import { Cars } from '../../interfaces/car-interface';
import { EditCar } from './edit-car';

export function DisplayCar(car: Cars) {
    const [showEdit, toggleShowEdit] = useState(false);

    const [showDeleteModal, toggleShowDeleteModal] = useState<boolean>(false);

    return(<>
        {!showEdit && 
            <li className="car">
                {car.year + ' '}
                {car.make + ' '}
                {car.model + ' '}
                ${car.price}
                <button className="edit" onClick={() => toggleShowEdit(true)}>Edit details</button>
                {showDeleteModal && 
                    <DeleteCar toggle={toggleShowDeleteModal} car={car} />}
                <button className="delete" onClick={() => toggleShowDeleteModal(true)}>Delete</button>
            </li>
        }

        {showEdit && 
            <EditCar toggle={toggleShowEdit} car={car} />
        }
    </>);
}