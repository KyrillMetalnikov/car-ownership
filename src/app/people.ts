import axios from "axios";
import { People } from "../interfaces/people-interface";

const baseURL = "http://localhost:3000/people";

export async function getPeople() {
    return axios.get<People[]>(baseURL);
}