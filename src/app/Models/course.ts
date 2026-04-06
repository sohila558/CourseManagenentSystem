import { Lesson } from "./lesson";

export interface Course{
    id : string;
    title : string;
    description : string;
    instructorName : string;
    lessons : Lesson[];
    image : string;
    category : string;
    enrolledStudentsNumber? : number;
}