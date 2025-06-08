import { useBookedSeats } from "@/context/BookedSeatsContext";
import type { BookedSeat } from "@/types/booked-seat";
import type { SocketMessage } from "@/types/socket-message";
import { useEffect, useRef } from "react";

type BookedSeatsSocketProps = {
  children: React.ReactNode;
};

export default function BookedSeatsSocket({ children }: BookedSeatsSocketProps) {
    const baseUrl = import.meta.env.VITE_WS_BASE_URL || 'ws://127.0.0.1:3000'; 
    const url =`${baseUrl}/ws`;
    const ws = useRef<WebSocket | null>(null);
    const {upsertSeatFromBookedSeat} = useBookedSeats();

    useEffect(() => {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.current.onmessage = (event) => {
            try {
                console.log(event);
                const data: SocketMessage<BookedSeat>  = JSON.parse(event.data);
                // Run updated bookedSeats
                upsertSeatFromBookedSeat(data.message)
            } catch (err) {
                console.error('Error parsing WebSocket message:', err);
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        ws.current.onerror = (err) => {
            console.error('WebSocket error:', err);
        };

        return () => {
            ws.current?.close();
        };
    }, [url, upsertSeatFromBookedSeat]);

    return (
        <>
        {children}
        </>
    )
}

