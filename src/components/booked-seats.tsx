import * as React from 'react'
import { useBookedSeats } from '@/context/BookedSeatsContext';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

interface BookedSeatsProps {
    rows: number;
    cols: number;
    seatSize?: number;
}

export const BookedSeats: React.FC<BookedSeatsProps> = ({
    rows,
    cols,
    seatSize = 50,
}) => {
    const { seats, selectedSeats, bookedSeats, toggleSeat } = useBookedSeats();

    return (
        <div
            className="w-screen h-[80vh] overflow-auto relative"
        >
            <TransformWrapper
                minScale={0.1}
                initialScale={0.25}
                wheel={{ step: 0.05 }}
                doubleClick={{ disabled: true }}
            >
                <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>

                    <div
                        style={{
                            width: cols * seatSize,
                            height: rows * seatSize,
                            position: "relative",
                        }}
                    >
                        {[...Array(rows)].flatMap((_, rowIndex) =>
                            [...Array(cols)].map((_, colIndex) => {
                                const index = rowIndex * cols + colIndex;
                                const key = `${rowIndex}-${colIndex}`;
                                const seatData = seats.find((s) => s.id === key);
                                const isSelectedSeat = Boolean(selectedSeats.find((s) => s.id === key));
                                const isBooked = Boolean(bookedSeats.find((s) => s.seat_id === key));
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            position: "absolute",
                                            top: rowIndex * seatSize,
                                            left: colIndex * seatSize,
                                            width: seatSize - 2,
                                            height: seatSize - 2,
                                            backgroundColor: isBooked ? "black" : isSelectedSeat? 'orangered': seatData ? seatData.color : "white",
                                            border: "1px solid white",
                                            boxSizing: "border-box",
                                            fontSize: 10,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "white",
                                        }}
                                        onClick={isBooked ? undefined : seatData ? () => {
                                            toggleSeat(key, seatData);
                                        } : undefined}
                                    >
                                        {isBooked ? 'Booked' : seatData?.name}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

export default BookedSeats