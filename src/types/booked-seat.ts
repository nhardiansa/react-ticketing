import type { Seat } from "./seat";

export type BookedSeat = {
    id?: string;
    seat_id?: string;
    show_id?:string;
    seat?: Seat | null;
    name: string;
    ticket_id: string;
    created_at?: string;
};