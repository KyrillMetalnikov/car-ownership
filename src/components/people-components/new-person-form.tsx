import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';


export function PersonForm() {
    const baseURL = "http://localhost:3000/people"
    const { register, handleSubmit } = useForm();
  
    function createPerson(data:any) {
      axios
        .post(baseURL, {
          ...data
        })
    }

    return (<div>
        <h2>Add New Person</h2>
        <form onSubmit={handleSubmit(createPerson)}>
          <input type="text" placeholder="First name" {...register("first_name", {required: true, maxLength: 80})} />
          <input type="text" placeholder="Last name" {...register("last_name", {required: true, maxLength: 100})} />
          <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
    
          <input type="submit" />
        </form>
      </div>);
  }