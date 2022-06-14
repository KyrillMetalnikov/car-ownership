import { DisplayPerson } from './display-person';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPeopleAsync, selectPeople } from '../../store/peopleSlice';
import React from 'react';

export function DisplayPeople() {
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(getPeopleAsync()) // Must be done inside useEffect to prevent infinite looping
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    let people = useAppSelector(selectPeople);

    return (
        <div className="App">
            <ul className="peoples">
                {people.map((person: any) => (
                    <div key={person.id}>
                        <DisplayPerson person={person} />
                    </div>
                ))}
            </ul>
        </div>
    )
}
