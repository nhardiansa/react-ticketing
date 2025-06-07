// context/SeatsContext.tsx
import React, { createContext, useContext } from 'react';
import type { Seat } from '@/types/seat';

export type SeatsContextType = {
    seatConfig: Seat;
    setSeatConfig: React.Dispatch<React.SetStateAction<Seat>>;
    selectedSeats: Seat[];
    setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>;
    toggleSeat: (id: string) => void;
    updateSeat: () => void;
};

export const SeatsContext = createContext<SeatsContextType | undefined>(undefined);

export const useSeats = (): SeatsContextType => {
    const context = useContext(SeatsContext);
    if (!context) {
        throw new Error('useSeats must be used within a SeatsProvider');
    }
    return context;
};
