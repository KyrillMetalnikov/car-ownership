import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { People } from "../interfaces/people-interface";
import { getPeople } from "../app/people";

export interface PeopleState {
    people: People[];
}

const initialState: PeopleState = {
    people: []
}

export const getPeopleAsync = createAsyncThunk(
    'people/getPeople',
    async () => {
        const response = await getPeople();
        return response.data;
    }
)

export const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        update: (state, action) => {
            state.people = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPeopleAsync.fulfilled, (state, action) => {
            state.people = action.payload;
        })
    }
})

export const { update } = peopleSlice.actions;
export const selectPeople = (state: RootState) => state.people.people;
export default peopleSlice.reducer;