import { CarForm } from './components/car-components/new-car-form';
import { PersonForm } from './components/people-components/new-person-form';
import { DisplayPeople } from './components/people-components/display-people';
import './App.css';
import ActionCable from 'actioncable';
import { getPeopleAsync } from './store/peopleSlice';
import { useAppDispatch } from './app/hooks';


function App() {
  const dispatch = useAppDispatch();
  const cable = ActionCable.createConsumer("http://localhost:3000/cable")

  const handleChange = () => {
    dispatch(getPeopleAsync());
  }
  
  cable.subscriptions.create('PeopleChannel', {
    received: handleChange
  })

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
