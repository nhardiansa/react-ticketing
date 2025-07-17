import { useSeats } from '@/context/SeatsContext';
import { useEffect, useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

interface SeatGridProps {
  rows: number;
  cols: number;
  seatSize?: number;
}

export const SeatGrid: React.FC<SeatGridProps> = ({
  rows,
  cols,
  seatSize = 50,
}) => {
  const [isCreateKeyPressed, setIsCreateKeyPressed] = useState(false);
  const [isDeleteKeyPressed, setIsDeleteKeyPressed] = useState(false);
  const { seats, toggleSeat, setSeatConfig, removeSeat, createSeat, seatGenerateConfig,setSeatGenerateConfig } = useSeats();

  const handleMouseOver = (seatId: string) => {
    if (isDeleteKeyPressed) {
      removeSeat(seatId);
    }
    if (isCreateKeyPressed) {
      createSeat(seatId);
    }
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'd' || event.key === 'D') {
      setIsDeleteKeyPressed(true);
    }
    if (event.key === 'c' || event.key === 'C') {
      setIsCreateKeyPressed(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'd' || event.key === 'D') {
      setIsDeleteKeyPressed(false);
    }
    if (event.key === 'c' || event.key === 'C') {
      setIsCreateKeyPressed(false);
    }
  };



  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div
      className="w-full h-[80vh] overflow-auto relative"
    >
      <TransformWrapper
        minScale={0.1}
        initialScale={0.3}
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
                const position = `${rowIndex}-${colIndex}`;
                const seatData = seats.find((s) => s.position === position);
                return (
                  <div
                    key={index}
                    style={{
                      position: "absolute",
                      top: rowIndex * seatSize,
                      left: colIndex * seatSize,
                      width: seatSize - 2,
                      height: seatSize - 2,
                      backgroundColor: seatData ? seatData.color : "white",
                      border: "1px solid grey",
                      boxSizing: "border-box",
                      fontSize: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: seatData?.color == "#000000"?"white":'black',
                    }}
                    onClick={() => {
                      if (seatData) {
                        setSeatConfig({ ...seatData })
                      }
                      setSeatGenerateConfig({...seatGenerateConfig, start: position,});
                    }}
                    onDoubleClick={() => toggleSeat(position)}
                    onMouseOver={() => handleMouseOver(position)}
                  >
                    <div className="flex flex-col items-center text-center">
                    <div className={`${seatData ? 'text-[5px]' : 'text-xs'}`}>
                      {position}
                    </div>
                      <div className="text-[15px]">
                        {seatData?.name}
                      </div>
                      <div className="text-[8px]">
                        {seatData?.category}
                      </div></div>
                  </div>
                );
              })
            )}
          </div>
        </TransformComponent>
        {/* <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>

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
                const position = `${rowIndex}-${colIndex}`;
                const seatData = seats.find((s) => s.position === position);

                return (
                  <div
                    key={index}
                    className={clsx(
                      'absolute border rounded cursor-pointer text-white text-center flex items-center justify-center text-xs'
                    )}
                    style={{
                      position: "absolute",
                      top: rowIndex * seatSize,
                      left: colIndex * seatSize,
                      width: seatSize - 2,
                      height: seatSize - 2,
                      backgroundColor: seatData ? seatData.color : "white",
                      boxSizing: "border-box",
                      fontSize: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                    onClick={() => {
                      if (seatData) {
                        setSeatConfig({ ...seatData })
                      }
                    }}
                    onDoubleClick={() => toggleSeat(position)}
                    onMouseOver={() => handleMouseOver(position)}
                  >
                    <div className="text-sm">
                      {position}</div>
                    <div className="text-xs">
                      {seatData?.category}</div>
                  </div>
                );
              })
            )}
          </div>
        </TransformComponent> */}
      </TransformWrapper>
    </div>
  );
};
