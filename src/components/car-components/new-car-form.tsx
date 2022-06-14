import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Select from 'react-select';
import { useAppSelector } from '../../app/hooks';
import { selectPeople } from '../../store/peopleSlice';
import { isEmptyObject } from '../../utils/utils';

export function CarForm() {

  const baseURL = "http://localhost:3000/people/"
  const { register, handleSubmit, formState: { errors } } = useForm();
  let people = useAppSelector(selectPeople);
  const [error, setError] = useState(false);


  function createCar(data:any) {
    if (person_id) {
      axios
      .post(baseURL + person_id + '/cars', {
        ...data
      })
    } else {
      setError(true);
    }
  }

  const [person_id, setPersonId]  = React.useState(null);
  const onChangeHandler = (change:any) => {
    setPersonId(change.value)
  }

  let actions:any= [];
  people.map((person) => (
    actions.push({ label: person.first_name + ' ' + person.last_name, value: person.id})
  ))
  
  return (<div>
    <h2>Add New Car</h2>
    <form onSubmit={handleSubmit(createCar)}>
      <input type="number" placeholder="Year" {...register("year", {required: true, min: 0, maxLength: 4})} />
      <input type="text" placeholder="Make" {...register("make", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Model" {...register("model", {required: true, maxLength: 100})} />
      <input type="number" placeholder="Price" {...register("price", {required: true, min: 0})} />
      <div className="selectForm">
        <Select options={ actions } onChange={onChangeHandler} defaultValue={ { label: "Choose owner", value: ""} } />
      </div>
      <input type="submit" />
      {(!isEmptyObject(errors) || error) && <div className="error">Missing values or year/price is less than 0</div>}
    </form>
  </div>);
}