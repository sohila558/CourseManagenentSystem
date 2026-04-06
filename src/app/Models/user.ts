export interface User{
    id : string;
    name : string;
    email : string;
    role : 'Admin' | 'Instructor' | 'Student';
    token? : string;
}

export interface LoginResponse{
    user : User;
    message : string;
}