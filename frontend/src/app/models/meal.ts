import {User} from "./user";

export interface Meal {
  _id?: string;
  date: Date;
  recipe: string;
  cook: string;
  note?: string;
  guests?: string[];
}
