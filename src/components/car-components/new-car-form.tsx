import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Select from 'react-select';

export function CarForm() {

  const baseURL = "http://localhost:3000/people/"
  const { register, handleSubmit } = useForm();


  function createCar(data:any) {
    axios
      .post(baseURL + person_id + '/cars', {
        ...data
      })
  }

  interface People {
    first_name: string;
    last_name: string;
    email: string;
    id: number;
  }


  const defaultPeople:People[] = [];
  const [people, setPeople] : [People[], (people: People[]) => void] = React.useState(defaultPeople);
  const [person_id, setPersonId]  = React.useState(null);
  const onChangeHandler = (change:any) => {
    setPersonId(change.value)
  }

  React.useEffect(() => {
      axios
          .get<People[]>("http://localhost:3000/people")
          .then(response => {
              setPeople(response.data);
          })
  }, []);

  let actions:any= [];
  people.map((person) => (
    actions.push({ label: person.first_name + ' ' + person.last_name, value: person.id})
  ))
  
  return (<div>
    <h2>Add New Car</h2>
    <form onSubmit={handleSubmit(createCar)}>
      <input type="number" placeholder="Year" {...register("year", {required: true, min: 1800, maxLength: 4})} />
      <input type="text" placeholder="Make" {...register("make", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Model" {...register("model", {required: true, maxLength: 100})} />
      <input type="number" placeholder="Price" {...register("price", {required: true, min: 0})} />
      <div className="selectForm">
        <Select options={ actions } onChange={onChangeHandler} />
      </div>
      <input type="submit" />
    </form>
  </div>);
}