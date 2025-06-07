import * as React from 'react'
import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual'
import { useSeats } from '@/context/SeatsContext';
import { FormSeatDialog } from './dialog/form-seat-dialog';
import { useState } from 'react';

interface SeatVirtualizerFixedProps {
    rows: number;
    cols: number;
    seatSize?: number;
}

export const SeatVirtualizerFixed: React.FC<SeatVirtualizerFixedProps> = ({
    rows,
    cols,
    seatSize = 50,
}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const parentRef = React.useRef<HTMLDivElement | null>(null)
    const { selectedSeats, setSeatConfig } = useSeats();

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
                                const seatData = selectedSeats.find((s) => s.id === key);
                                return (
                                    <div
                                        key={virtualColumn.key}
                                        className={`absolute cursor-pointer flex items-center justify-center text-sm border bg-white hover:bg-gray-50`}
                                        style={{
                                            top: 0,
                                            left: 0,
                                            width: `${virtualColumn.size}px`,
                                            height: `${virtualRow.size}px`,
                                            transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                                            backgroundColor: seatData?.color ?? undefined,
                                        }}
                                        onClick={seatData ? () => {
                                            if (seatData) {
                                                setSeatConfig(seatData);
                                                setOpenDialog(true);
                                            }
                                        } : undefined}
                                    >

                                        {
                                            seatData ? <div className="flex flex-col text-white">
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
            <FormSeatDialog isOpen={openDialog} onOpenChange={setOpenDialog} />
        </>
    )
}

export default SeatVirtualizerFixed
