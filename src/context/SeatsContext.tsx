// context/SeatsContext.tsx
import React, { createContext, useContext } from 'react';
import type { Seat, SeatGenerate } from '@/types/seat';

export type SeatsContextType = {
    selectedShow: string;
    setSelectedShow: React.Dispatch<React.SetStateAction<string>>;
    toggleSelectShow: (show: string) => Promise<void>;
    seatConfig: Seat;
    setSeatConfig: React.Dispatch<React.SetStateAction<Seat>>;
    seatGenerateConfig: SeatGenerate;
    setSeatGenerateConfig: React.Dispatch<React.SetStateAction<SeatGenerate>>;
    seats: Seat[];
    setSeats: React.Dispatch<React.SetStateAction<Seat[]>>;
    toggleSeat: (id: string) => void;
    updateSeat: () => void;
    countByCategory: Record<string, { total: number; color: string }>;
    removeSeat: (id: string) => void;
    createSeat: (id: string) => void;
    generateReset: () => void;
    generateSeats: () => void;
};

export const SeatsContext = createContext<SeatsContextType | undefined>(undefined);

export const useSeats = (): SeatsContextType => {
    const context = useContext(SeatsContext);
    if (!context) {
        throw new Error('useSeats must be used within a SeatsProvider');
    }
    return context;
};
