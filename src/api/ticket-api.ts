
import { admin_api } from './axios';
import type { BookedSeat } from '@/types/booked-seat';

export const findTicket = async (): Promise<BookedSeat[]> => {
    const res = await admin_api.get("/admin_api/tickets", {

    },
    );
    return res.data.data as BookedSeat[];
};

export const findTicketsByID = async (id?: string): Promise<BookedSeat[]> => {
    const res = await admin_api.get("/admin_api/tickets", {
        params: {
            id
        }
    },
    );
    return res.data.data as BookedSeat[];
};