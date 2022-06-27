import { DisplayPerson } from './display-person';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPeopleAsync, selectPeople } from '../../store/peopleSlice';
import React from 'react';
import { People } from '../../interfaces/people-interface';

export function DisplayPeople() {
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        dispatch(getPeopleAsync()) // Must be done inside useEffect to prevent infinite looping
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    let people: People[] = useAppSelector(selectPeople);

    return (
        <div className="App">
            <ul className="peoples">
                {people.map((person: People) => (
                    <div key={person.id}>
                        <DisplayPerson {...person} />
                    </div>
                ))}
            </ul>
        </div>
    )
}
