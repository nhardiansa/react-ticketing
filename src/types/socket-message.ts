import type { BookedSeat } from "./booked-seat";
import type { SeatLocked } from "./seat";

export interface SocketMessage{
    type:string,
    sender_id:string,
    message: BookedSeat | SeatLocked,
};