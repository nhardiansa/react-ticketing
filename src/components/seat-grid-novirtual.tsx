import React, { useState, useCallback, useMemo } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import clsx from 'clsx';

interface SeatGridNovirtualProps {
  rows: number;
  cols: number;
  seatSize?: number; // px
}

export const SeatGridNovirtual: React.FC<SeatGridNovirtualProps> = ({
  rows,
  cols,
  seatSize = 40,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  const toggleSeat = useCallback((row: number, col: number) => {
    const key = `${row}-${col}`;
    setSelectedSeats((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  }, []);

  // Pre-render seats
  const seats = useMemo(() => {
    const items = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const key = `${row}-${col}`;
        const isSelected = selectedSeats.has(key);
        items.push(
          <div
            key={key}
            onClick={() => toggleSeat(row, col)}
            className={clsx(
              'border rounded cursor-pointer flex items-center justify-center text-[10px]',
              isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            )}
            style={{
              width: seatSize - 4,
              height: seatSize - 4,
            }}
          >
            {key}
          </div>
        );
      }
    }
    return items;
  }, [rows, cols, selectedSeats, seatSize, toggleSeat]);

  const gridWidth = cols * seatSize;
  const gridHeight = rows * seatSize;

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 800;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 600;

  const initialScale = Math.min(
    viewportWidth / gridWidth,
    viewportHeight / gridHeight,
    1 // jangan lebih dari 100%
  );

  return (
    <div className="w-full h-full overflow-hidden">
      <TransformWrapper
        initialScale={initialScale}
        minScale={0.1}
        maxScale={5}
        wheel={{ step: 0.1 }}
        doubleClick={{ disabled: true }}
        panning={{ velocityDisabled: true }}
      >
        <TransformComponent>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, ${seatSize}px)`,
              gridTemplateRows: `repeat(${rows}, ${seatSize}px)`,
              width: gridWidth,
              height: gridHeight,
            }}
          >
            {seats}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
