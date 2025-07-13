// context/SeatsProvider.tsx
import React, { useEffect, useState } from 'react';
import { SeatsContext } from './SeatsContext';
import { deleteSeat, findSeats, postSeat, putSeat } from '@/api/seatApi';
import type { Seat, SeatGenerate } from '@/types/seat';
import { toast } from 'sonner';

export const SeatsProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedShow, setSelectedShow] = useState<string>("reconnect");
    const [seatConfig, setSeatConfig] = useState<Seat>({
        name: 'Default Name',
        color: '#00BFFF',
        category: 'default',
    });

    const [seatGenerateConfig, setSeatGenerateConfig] = useState<SeatGenerate>({
        start: '',
        cols: 0,
        rows: 0,
        group: 'A',
        number_start: 1,
    });

    const toggleSelectShow = async (show: string) => {
        setSelectedShow(show);
        localStorage.setItem("selectedShow", show);
        const seats = await findSeats(show);
        setSeats(seats);
    };

    const [seats, setSeats] = useState<Seat[]>([]);

    const toggleSeat = (position: string) => {
        setSeats((prev) => {
            const exists = prev.find((s) => s.position === position);
            let newSeats: Seat[];

            if (exists) {
                const id = `${selectedShow}-${position}`;
                newSeats = prev.filter((s) => s.position !== position);
                deleteSeat(id).then(() => toast.success(`Berhasil hapus kursi`)).catch((err) =>
                    toast.error(`Gagal hapus kursi: ${err}`)
                );
            } else {
                const id = `${selectedShow}-${position}`;
                const newSeat: Seat = { ...seatConfig, id: id, position: position, show_id: selectedShow };
                newSeats = [...prev, newSeat];
                postSeat(newSeat).catch((err) =>
                    toast.error(`Gagal hapus kursi: ${err}`)
                );
            }

            return newSeats;
        });
    };

    const removeSeat = (position: string) => {
        setSeats((prev) => {
            const exists = prev.find((s) => s.position === position);
            let newSeats = [...prev];

            if (exists) {
                const id = `${selectedShow}-${position}`;
                newSeats = prev.filter((s) => s.position !== position);
                deleteSeat(id).catch((err) =>
                    toast.error(`Gagal hapus kursi: ${err}`)
                );
            }
            return newSeats;
        });
    };

    const createSeat = (position: string, name?: string) => {
        setSeats((prev) => {
            const id = `${selectedShow}-${position}`;
            const newSeat: Seat = { ...seatConfig, id: id, name, position: position, show_id: selectedShow };
            const newSeats = [...prev, newSeat];
            postSeat(newSeat).catch((err) =>
                toast.error(`Gagal hapus kursi: ${err}`)
            );
            return newSeats;
        });
    };

    // Fetch selected seats from backend
    useEffect(() => {
        const fetchseats = async () => {
            const fetchData = async () => {
                try {
                    const seats = await findSeats(selectedShow);
                    setSeats(seats);
                } catch (err) {
                    toast.error(`Failed to fetch selected seats: ${err}`);
                }
            };

            fetchData();
        };

        fetchseats();
    }, [setSeats, selectedShow]);

    const updateSeat = () => {
        putSeat(seatConfig.id ?? '', seatConfig).then(() => {
            setSeats((prevSeats) =>
                prevSeats.map((seat) =>
                    seat.id === seatConfig.id ? { ...seatConfig } : seat
                )
            );
            toast.success(`Success update`);
        }).catch((err) =>
            toast.error(`Gagal hapus kursi: ${err}`)
        );
    };

    const countByCategory = seats.reduce((acc, seat) => {
        if (seat.category === 'STAGE') return acc;
        if (!acc[seat.category]) {
            acc[seat.category] = {
                total: 0,
                color: seat.color,
            };
        }

        acc[seat.category].total += 1;
        return acc;
    }, {} as Record<string, { total: number; color: string }>);

    function generateReset() {
        if (
            !seatGenerateConfig?.start ||
            seatGenerateConfig.cols <= 0 ||
            seatGenerateConfig.rows <= 0
        ) {
            toast.error("Please fill generate config");
            return;
        }

        const rows = Number(seatGenerateConfig.rows);
        const cols = Number(seatGenerateConfig.cols);
        const startSplit = seatGenerateConfig.start.split('-');

        const startX = parseInt(startSplit[0].trim(), 10);
        const startY = parseInt(startSplit[1].trim(), 10);

        if (isNaN(startX) || isNaN(startY)) {
            toast.error("Invalid start format, should be 'x-y'");
            return;
        }

        console.log(`Generating seats from start: ${startX}-${startY}, rows: ${rows}, cols: ${cols}`);
        for (let x = startX; x < startX + rows; x++) {
            for (let y = startY; y < startY + cols; y++) {
                const position = `${x}-${y}`;
                removeSeat(position);
            }
        }
    }

    function generateSeats() {
        if (
            !seatGenerateConfig?.start ||
            seatGenerateConfig.cols <= 0 ||
            seatGenerateConfig.rows <= 0
        ) {
            toast.error("Please fill generate config");
            return;
        }

        const rows = Number(seatGenerateConfig.rows);
        const cols = Number(seatGenerateConfig.cols);
        const startSplit = seatGenerateConfig.start.split('-');

        const startX = parseInt(startSplit[0].trim(), 10);
        const startY = parseInt(startSplit[1].trim(), 10);

        if (isNaN(startX) || isNaN(startY)) {
            toast.error("Invalid start format, should be 'x-y'");
            return;
        }

        const group = seatGenerateConfig.group || '';
        let seatNumber = seatGenerateConfig.number_start ?? 1;

        console.log(`Generating seats from start: ${startX}-${startY}, rows: ${rows}, cols: ${cols}`);
        for (let x = startX; x < startX + rows; x++) {
            for (let y = startY; y < startY + cols; y++) {
                const position = `${x}-${y}`;

                const formattedNumber = String(seatNumber);

                const name = `${group}${formattedNumber}`;
                seatNumber++; // Increment setelah membuat nama

                createSeat(position, name);
            }
        }
    }

    return (
        <SeatsContext.Provider
            value={{
                selectedShow,
                setSelectedShow,
                toggleSelectShow,
                seatConfig,
                setSeatConfig,
                seatGenerateConfig,
                setSeatGenerateConfig,
                seats,
                setSeats,
                toggleSeat,
                updateSeat,
                countByCategory,
                removeSeat,
                createSeat,
                generateReset,
                generateSeats,
            }}
        >
            {children}
        </SeatsContext.Provider>
    );
};
