// context/SeatsContext.tsx
import React, { createContext, useContext } from 'react';
import type { Seat, SeatLocked } from '@/types/seat';
import type { BookedSeat } from '@/types/booked-seat';

export type BookedSeatsContextType = {
    seats: Seat[];
    selectedSeats: SeatLocked[];
    authSelectedSeats: SeatLocked[];
    anotherAuthSelectedSeats: SeatLocked[];
    setSelectedSeats: React.Dispatch<React.SetStateAction<SeatLocked[]>>;
    bookedSeats: BookedSeat[];
    setBookedSeats: React.Dispatch<React.SetStateAction<BookedSeat[]>>;
    selectedShow: string;
    claimBookingSeats: (name: string, ticket_id: string) => void;
    toggleSeat: (id: string, seat: Seat) => void;
    toggleSelectShow: (show: string) => void;
    upsertSeatFromBookedSeat: (seat: BookedSeat) => void;
    upsertSelectedSeats: (type: string, seat: SeatLocked) => void;
};

export const BookedSeatsContext = createContext<BookedSeatsContextType | undefined>(undefined);

export const useBookedSeats = (): BookedSeatsContextType => {
    const context = useContext(BookedSeatsContext);
    if (!context) {
        throw new Error('useBookedSeats must be used within a BookedSeatsProvider');
    }
    return context;
};
