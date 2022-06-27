import { Cars } from "./car-interface";

export interface People {
    first_name: string;
    last_name: string;
    email: string;
    id: number;
    cars: Cars[];
  }