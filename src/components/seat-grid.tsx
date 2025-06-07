import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import clsx from 'clsx';
import { useSeats } from '@/context/SeatsContext';

interface SeatGridProps {
  rows: number;
  cols: number;
  seatSize?: number;
}

export const SeatGrid: React.FC<SeatGridProps> = ({
  rows,
  cols,
  seatSize = 40,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { selectedSeats, toggleSeat, setSeatConfig } = useSeats();


  const rowVirtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => seatSize,
    overscan: 5,
  });

  const colVirtualizer = useVirtualizer({
    horizontal: true,
    count: cols,
    getScrollElement: () => parentRef.current,
    estimateSize: () => seatSize,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="overflow-auto w-full h-full"
      style={{
        width: cols * seatSize,
        height: rows * seatSize,
        position: 'relative',
      }}
    >
      <div
        style={{
          width: colVirtualizer.getTotalSize(),
          height: rowVirtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <React.Fragment key={virtualRow.key}>
            {colVirtualizer.getVirtualItems().map((virtualCol) => {
              const rowIndex = virtualRow.index;
              const colIndex = virtualCol.index;
              const key = `${rowIndex}-${colIndex}`;
              const seatData = selectedSeats.find((s) => s.id === key);;
              const isSelected = Boolean(seatData);

              return (
                <div
                  key={key}
                  onClick={()=>{
                    if(seatData){
                      setSeatConfig({...seatData})
                    }
                  }}
                  onDoubleClick={() => toggleSeat(key)}
                  className={clsx(
                    'absolute border rounded cursor-pointer text-white text-center flex items-center justify-center text-xs',
                    isSelected ? '' : 'bg-gray-200 hover:bg-gray-300'
                  )}
                  style={{
                    top: virtualRow.start,
                    left: virtualCol.start,
                    width: seatSize - 4,
                    height: seatSize - 4,
                    backgroundColor: seatData?.color ?? undefined,
                  }}
                >
                  {seatData?.name || key}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
