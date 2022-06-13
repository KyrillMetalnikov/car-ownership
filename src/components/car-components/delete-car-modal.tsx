import axios from 'axios';
import React from 'react';
import './delete-car-modal.css';

export const DeleteCarModal = (handleClose:any, car:any) => {
    console.log(car)
    const url = "http://localhost:3000/people/" + + car.person_id + '/cars/' + car.id;

    function deleteCar() {
        axios.delete(url);
    }

  return (
    <div className="modal">
      <section className="modal-main">
        <p>Are you sure you want to delete this car?</p>
        <button type="button" onClick={deleteCar}>
            Delete
        </button>
        <button type="button" onClick={handleClose.handleClose}>
            Cancel
        </button>
      </section>
    </div>
  );
};