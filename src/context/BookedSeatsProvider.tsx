// context/BookedSeatsProvider.tsx
import React, { useEffect, useState } from 'react';
import type { Seat, SeatLocked } from '@/types/seat';
import { toast } from 'sonner';
import { BookedSeatsContext } from './BookedSeatsContext';
import type { BookedSeat } from '@/types/booked-seat';
import { findBookedSeats, getSeatsLocked, lockSeat, upsertSeats } from '@/api/booked-seat-api';
import { findSeats } from '@/api/seatApi';
import { useAuth } from './AuthContext';
import type { Ticket } from '@/types/ticket';
import { findTicketsByID } from '@/api/ticket-api';

export const BookedSeatsProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedShow, setSelectedShow] = useState<string>("reconnect");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedSeats, setSelectedSeats] = useState<BookedSeat[]>([]);
    const authSelectedSeats = selectedSeats.filter((s) => s.admin_id === user?.id);
    const anotherAuthSelectedSeats = selectedSeats.filter((s) => s.admin_id !== user?.id);
    const [bookedSeats, setBookedSeats] = useState<BookedSeat[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const seatCategories = Array.from(new Set(seats.map(seat => seat.category)));


    // Fetch selected seats from backend
    useEffect(() => {
        const fetchSelectedSeats = async () => {
            const fetchData = async () => {
                try {
                    const seats = await findSeats();
                    setSeats(seats);
                    const bookedSeats = await findBookedSeats(selectedShow);
                    setBookedSeats(bookedSeats);
                    getSeatsLocked(selectedShow).then((res) => {

                        setSelectedSeats(res);
                    })
                } catch (err) {
                    toast.error(`Failed to fetch selected seats: ${err}`);
                }
            };

            fetchData();
        };

        fetchSelectedSeats();
    }, [setSelectedSeats, setBookedSeats, selectedShow]);

    const toggleSelectShow = async (show: string) => {
        setSelectedShow(show);
        const seats = await findBookedSeats();
        setBookedSeats(seats);
        getSeatsLocked(selectedShow).then((res) => {
            setSelectedSeats(res);
        })
    };

    const toggleSelectCategory = async (category: string) => {
        setSelectedCategory(category);
    };

    const toggleSeat = (id: string) => {
        const newSeat: SeatLocked = { seat_id: id, admin_id: user?.id, show_id: selectedShow };
        toast.promise(lockSeat(newSeat), {
            loading: 'Lock Seat Loading...',
            success: (data) => {
                console.log("Locked", data);
                if (data.status == "locked") {
                    setSelectedSeats([...selectedSeats, data.data]);
                    return `Seat has been ${data.status}`;
                } if (data.status == "unlocked") {
                    setSelectedSeats((prev) => {
                        const exists = prev.find((s) => s.seat_id === id);
                        let newSeats: SeatLocked[] = prev;
                        if (exists) {
                            newSeats = prev.filter((s) => s.seat_id !== id);
                        }
                        return newSeats;
                    });
                    return `Seat has been ${data.status}`;
                }
                return `Seat has been ${data.status}`;
            },
            error: (err) => {
                // optional: custom error handling
                return err?.message || 'Error locking seat';
            },
        });
    };

    const claimBookingSeats = async () => {
        try {
            const res = await upsertSeats(authSelectedSeats);
            toast.success('Successfully booking seats');
            res.forEach((seat) => {
                upsertSeatFromBookedSeat(seat);
                setSelectedSeats((prev) => {
                    const exists = prev.find((s) => s.seat_id === seat.seat_id);
                    let newSeats: SeatLocked[] = prev;
                    if (exists) {
                        newSeats = prev.filter((s) => s.seat_id !== seat.seat_id);
                    }
                    return newSeats;
                });
            });
        } catch (err) {
            toast.error(`Failed to booking seats: ${err}`);
        }
    };

    const upsertSeatFromBookedSeat = (seat: BookedSeat) => {
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
    }

    const upsertSelectedSeats = (type: string, seat: BookedSeat) => {
        if (seat.show_id === selectedShow) {
            if (type === "seat_locked") {
                setSelectedSeats([...selectedSeats, seat]);
            } if (type === "seat_unlocked") {
                setSelectedSeats((prev) => {
                    const exists = prev.find((s) => s.seat_id === seat.seat_id);
                    let newSeats: SeatLocked[] = prev;
                    if (exists) {
                        newSeats = prev.filter((s) => s.seat_id !== seat.seat_id);
                    }
                    return newSeats;
                });
            }
        }
    }

    const searchTicketsByID = async (id: string) => {
        const tickets = await findTicketsByID(id);
        setTickets(tickets);
    }

    const handleSelectedTicket = (ticket: Ticket, seat: Seat) => {
        setSelectedSeats((prev) => {
            const index = prev.findIndex((s) => s.seat_id === seat.id)
            const exists = prev.find((s) => s.seat_id === seat.id);

            if (index !== -1 && exists) {
                const updated = [...prev]
                updated[index] = {
                    id: `${selectedShow}-${seat.id}`,
                    show_id: selectedShow,
                    seat_id: seat.id,
                    admin_id: user?.id,
                    name: ticket.name,
                    ticket_id: ticket.id,
                };

                return updated
            }
            return prev;
        });
    }

    return (
        <BookedSeatsContext.Provider
            value={{
                seats,
                selectedSeats,
                authSelectedSeats,
                anotherAuthSelectedSeats,
                setSelectedSeats,
                selectedShow,
                toggleSelectShow,
                toggleSeat,
                bookedSeats,
                setBookedSeats,
                claimBookingSeats,
                upsertSeatFromBookedSeat,
                upsertSelectedSeats,
                tickets,
                setTickets,
                searchTicketsByID,
                handleSelectedTicket,
                selectedCategory,
                toggleSelectCategory,
                seatCategories,
            }}
        >
            {children}
        </BookedSeatsContext.Provider>
    );
};
