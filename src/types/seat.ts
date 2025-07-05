export type Seat = {
    id?: string;
    position?: string | null;
    name?: string;
    category: string;
    color: string;
    show_id?: string | null;
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

export type SeatGenerate = {
    start: string;
    cols: number;
    rows: number;
};