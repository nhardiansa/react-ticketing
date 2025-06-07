// context/SeatsProvider.tsx
import React, { useEffect, useState } from 'react';
import { SeatsContext } from './SeatsContext';
import { deleteSeat, findSeats, postSeat, putSeat } from '@/api/seatApi';
import type { Seat } from '@/types/seat';
import { toast } from 'sonner';

export const SeatsProvider = ({ children }: { children: React.ReactNode }) => {
    const [seatConfig, setSeatConfig] = useState<Seat>({
        name: 'Default Name',
        color: '#00BFFF',
        category: 'default',
    });

    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    const toggleSeat = (id: string) => {
        setSelectedSeats((prev) => {
            const exists = prev.find((s) => s.id === id);
            let newSeats: Seat[];

            if (exists) {
                newSeats = prev.filter((s) => s.id !== id);
                deleteSeat(id).then(() => toast.success(`Berhasil hapus kursi`)).catch((err) =>
                    toast.error(`Gagal hapus kursi: ${err}`)
                );
            } else {
                const newSeat: Seat = { ...seatConfig, id };
                newSeats = [...prev, newSeat];
                postSeat(newSeat).catch((err) =>
                    toast.error(`Gagal hapus kursi: ${err}`)
                );
            }

            return newSeats;
        });
    };

    // Fetch selected seats from backend
    useEffect(() => {
        const fetchSelectedSeats = async () => {
            const fetchData = async () => {
                try {
                    const seats = await findSeats();
                    setSelectedSeats(seats);
                } catch (err) {
                    toast.error(`Failed to fetch selected seats: ${err}`);
                }
            };

            fetchData();
        };

        fetchSelectedSeats();
    }, [setSelectedSeats]);

    const updateSeat = () => {
        putSeat(seatConfig.id ?? '', seatConfig).then(()=>{
            setSelectedSeats((prevSeats) =>
                prevSeats.map((seat) =>
                    seat.id === seatConfig.id ? { ...seatConfig } : seat
                )
            );
            toast.success(`Success update`);
        }).catch((err) =>
            toast.error(`Gagal hapus kursi: ${err}`)
        );
    };

    return (
        <SeatsContext.Provider
            value={{
                seatConfig,
                setSeatConfig,
                selectedSeats,
                setSelectedSeats,
                toggleSeat,
                updateSeat,
            }}
        >
            {children}
        </SeatsContext.Provider>
    );
};
