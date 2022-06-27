import axios from "axios";
import { UpdatePersonProps } from "../../interfaces/props/update-person-props";
import { baseURL } from "../../utils/utils";

export function DeletePerson({toggle, person}: UpdatePersonProps) {
    function handleClose() { 
        toggle(false);
    }

    function deletePerson() {
        axios.delete(baseURL + person.id);
        handleClose();
    }

    return (
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
        </div>
    )
}