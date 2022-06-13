import React from 'react';
import { CarForm } from './components/car-components/new-car-form';
import { PersonForm } from './components/people-components/new-person-form';
import { DisplayPeople } from './components/people-components/display-people';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Car Ownership App</h1>
      <PersonForm />
      <CarForm />
      <DisplayPeople />
    </div>
  );
}

export default App;
