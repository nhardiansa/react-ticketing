import * as React from 'react'
import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual'
import { useBookedSeats } from '@/context/BookedSeatsContext';

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

    const parentRef = React.useRef<HTMLDivElement | null>(null)
    const { seats, selectedSeats, bookedSeats, toggleSeat } = useBookedSeats();

    const rowVirtualizer = useVirtualizer({
        count: rows,
        getScrollElement: () => parentRef.current,
        estimateSize: () => seatSize,
        overscan: 5,
    })

    const columnVirtualizer = useVirtualizer({
        horizontal: true,
        count: cols,
        getScrollElement: () => parentRef.current,
        estimateSize: () => seatSize,
        overscan: 5,
    })

    return (
        <>
            <div
                ref={parentRef}
                className="h-180 w-full overflow-auto"
            >
                <div
                    className="relative"
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: `${columnVirtualizer.getTotalSize()}px`,
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow: VirtualItem) => (
                        <React.Fragment key={virtualRow.key}>
                            {columnVirtualizer.getVirtualItems().map((virtualColumn: VirtualItem) => {
                                const rowIndex = virtualRow.index;
                                const colIndex = virtualColumn.index;
                                const key = `${rowIndex}-${colIndex}`;
                                const seatData = seats.find((s) => s.id === key);
                                const isSelected = Boolean(selectedSeats.find((s) => s.id === key));
                                const isBooked = Boolean(bookedSeats.find((s) => s.seat_id === key));
                                return (
                                    <div
                                        key={virtualColumn.key}
                                        className={`absolute flex items-center justify-center text-sm ${seatData ? "border cursor-pointer hover:bg-gray-50" : ""} bg-transparent`}
                                        style={{
                                            top: 0,
                                            left: 0,
                                            width: `${virtualColumn.size}px`,
                                            height: `${virtualRow.size}px`,
                                            transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                                            backgroundColor: isBooked ? "black" : isSelected ? "orangered" : seatData?.color ?? undefined,
                                        }}
                                        onClick={isBooked ? undefined : seatData ? () => {
                                            toggleSeat(key, seatData);
                                        } : undefined}
                                    >

                                        {
                                            isBooked?<p className='text-white text-xs'>Booked</p>:seatData ? <div className="flex flex-col text-white">
                                                <p className="text-xs">{seatData.name}</p>
                                            </div> : <></>
                                        }
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>

        </>
    )
}

export default BookedSeats