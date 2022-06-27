import axios from "axios";
import { UpdateCarProps } from "../../interfaces/update-car-props";
import { baseURL } from "../../utils/utils";
import './delete-car-modal.css';



export function DeleteCar({toggle, car}: UpdateCarProps) {
    console.log(car)
    function handleClose() { 
        toggle(false);
    }

    function deleteCar() {
        axios.delete(baseURL + car.person_id + '/cars/' + car.id);
        handleClose();
    }
    
    return(
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
        </div>
    )
}