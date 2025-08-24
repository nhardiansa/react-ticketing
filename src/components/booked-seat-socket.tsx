import { useBookedSeats } from "@/context/BookedSeatsContext";
import type { SocketMessage } from "@/types/socket-message";
import { useCallback, useEffect, useRef } from "react";

// Define interface for deleted seat message
interface DeletedSeatInfo {
    id: string;
    deleted: boolean;
    seat_id: string;
    show_id: string;
}

type BookedSeatsSocketProps = {
    children: React.ReactNode;
};

export default function BookedSeatsSocket({ children }: BookedSeatsSocketProps) {
    const baseUrl = import.meta.env.VITE_WS_BASE_URL || 'ws://127.0.0.1:3000';
    const url = `${baseUrl}/ws`;
    const ws = useRef<WebSocket | null>(null);
    const { upsertSeatFromBookedSeat, upsertSelectedSeats, removeBookedSeat } = useBookedSeats();

    const handleMessage = useCallback((event: MessageEvent) => {
        try {
            const data: SocketMessage = JSON.parse(event.data);
            if (data.type === "booked_seat") {
                upsertSeatFromBookedSeat(data.message);
            } else if (data.type === "seat_locked" || data.type === "seat_unlocked") {
                upsertSelectedSeats(data.type, data.message);
            } else if (data.type === "booked_seat_deleted") {
                // Handle deleted seat message
                const deleteInfo = data.message as DeletedSeatInfo;
                if (deleteInfo.id && deleteInfo.deleted) {
                    removeBookedSeat(deleteInfo.id,true);
                }
            }
        } catch (err) {
            console.error("Error parsing WebSocket message:", err);
        }
    }, [upsertSeatFromBookedSeat, upsertSelectedSeats, removeBookedSeat]);

    useEffect(() => {
        if (ws.current) return; // ✅ Jangan reconnect
        const socket = new WebSocket(url);
        ws.current = socket;

        socket.onopen = () => {
            console.log('✅ WebSocket connected:', url);
            ws.current?.send(JSON.stringify({ type: "ping", message: "init" }));
        };

        socket.onmessage = handleMessage;

        socket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        socket.onerror = (err) => {
            console.error('WebSocket error:', err);
        };

        return () => {
            socket?.close();
        };
    }, []);

    return (
        <>
            {children}
        </>
    )
}

