import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

export function EditCar(car:any, handler:any) {

  car = car.car

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

  const { register } = useForm();

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
  
  return (
    <div onChange={handler.handleCallback}>
      <input type="number" defaultValue={car.year.toString()} {...register("year", {required: true, min: 1800, maxLength: 4})} />
      <input type="text" defaultValue={car.make} {...register("make", {required: true, maxLength: 100})} />
      <input type="text" defaultValue={car.model} {...register("model", {required: true, maxLength: 100})} />
      <input type="number" defaultValue={car.price.toString()} {...register("price", {required: true, min: 0})} />
      <Select options={ actions } onChange={onChangeHandler} />
    
      <input type="submit" />
    </div>
  );
}