export type Seat = {
    id?: string;
    name?: string;
    category: string;
    color: string;
};

export type SeatLocked = {
    seat_id?: string;
    admin_id?: string;
    show_id?:string;
};

export type ResSeatLocked = {
    status: string,
    data:SeatLocked,
}