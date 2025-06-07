import axios from './axios';
import type { BookedSeat } from '@/types/booked-seat';

export const findBookedSeats = async (show?: string): Promise<BookedSeat[]> => {
    const res = await axios.get("/api/booked-seats", {
        params: {
            show
        }
    },
    );
    return res.data.data as BookedSeat[];
};

export const upsertSeats = async (seats: BookedSeat[]): Promise<BookedSeat[]> => {
    const res = await axios.post("/api/booked-seats/upsert", seats);
    return res.data.data as BookedSeat[];
};
