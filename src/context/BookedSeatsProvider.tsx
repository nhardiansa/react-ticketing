// context/BookedSeatsProvider.tsx
import React, { useEffect, useState } from 'react';
import type { Seat } from '@/types/seat';
import { toast } from 'sonner';
import { BookedSeatsContext } from './BookedSeatsContext';
import type { BookedSeat } from '@/types/booked-seat';
import { findBookedSeats, upsertSeats } from '@/api/booked-seat-api';
import { findSeats } from '@/api/seatApi';

export const BookedSeatsProvider = ({ children }: { children: React.ReactNode }) => {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedShow, setSelectedShow] = useState<string>("reconnect");
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    const [bookedSeats, setBookedSeats] = useState<BookedSeat[]>([]);


    // Fetch selected seats from backend
    useEffect(() => {
        const fetchSelectedSeats = async () => {
            const fetchData = async () => {
                try {
                    const seats = await findSeats();
                    setSeats(seats);
                    const bookedSeats = await findBookedSeats(selectedShow);
                    setBookedSeats(bookedSeats);
                } catch (err) {
                    toast.error(`Failed to fetch selected seats: ${err}`);
                }
            };

            fetchData();
        };

        fetchSelectedSeats();
    }, [setSelectedSeats, setBookedSeats]);

    const toggleSelectShow = async (show: string) => {
        setSelectedShow(show);
        const seats = await findBookedSeats();
        setBookedSeats(seats);
        setSelectedSeats([]);
    };

    const toggleSeat = (id: string, seat: Seat) => {
        setSelectedSeats((prev) => {
            const exists = prev.find((s) => s.id === id);
            let newSeats: Seat[];

            if (exists) {
                newSeats = prev.filter((s) => s.id !== id);
            } else {
                const newSeat: Seat = { ...seat, id };
                newSeats = [...prev, newSeat];
            }

            return newSeats;
        });
    };

    const claimBookingSeats = async (name?: string, ticket_id?: string) => {
        try {
            const formData: BookedSeat[] = selectedSeats.map((seat) => ({
                id: `${selectedShow}-${seat.id}`,
                show_id: selectedShow,
                seat_id: seat.id,
                name: name || '',
                ticket_id: ticket_id || '',
            }));

            const res = await upsertSeats(formData);
            toast.success('Successfully booking seats');
            res.forEach((seat) => {

                setBookedSeats((prev) => {
                    const existingIndex = bookedSeats.findIndex((s) => s.id === seat.id);
                    let newSeats = [...prev];
                    if (existingIndex !== -1) {
                        newSeats[existingIndex] = seat;
                    } else {
                        newSeats = [...prev, seat];
                    }

                    return newSeats;
                });
            });
            setSelectedSeats([]);
        } catch (err) {
            toast.error(`Failed to booking seats: ${err}`);
        }
    };

    return (
        <BookedSeatsContext.Provider
            value={{
                seats,
                selectedSeats,
                setSelectedSeats,
                selectedShow,
                toggleSelectShow,
                toggleSeat,
                bookedSeats,
                setBookedSeats,
                claimBookingSeats,
            }}
        >
            {children}
        </BookedSeatsContext.Provider>
    );
};
