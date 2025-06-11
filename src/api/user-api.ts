import type { User } from '@/types/user';
import axios, { admin_api } from './axios';
import type { BookedSeat } from '@/types/booked-seat';

export const findUsers = async (): Promise<BookedSeat[]> => {
    const res = await admin_api.get("/admin_api/users",);
    return res.data.data as BookedSeat[];
};

export const login = async (email:string, password:string): Promise<User> => {
    const res = await axios.post("/api/login", {
        "email":email,
        "password":password,
    });
    const token = res.data.token;
    const user = res.data.data;
    if(token && user){
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(user));
    }
    console.log("USER",user);
     // Atau dari Redux/Context
    return res.data.data as User;
};
