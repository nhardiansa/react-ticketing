import { useSeats } from '@/context/SeatsContext';
import clsx from 'clsx';
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
  const { selectedSeats, toggleSeat, setSeatConfig } = useSeats();

  return (
    <div
      className="w-screen h-[80vh] overflow-auto relative"
    >
      <TransformWrapper
        minScale={0.1}
        initialScale={1}
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
                const seatData = selectedSeats.find((s) => s.id === key);

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
                    onDoubleClick={() => toggleSeat(key)}
                  >
                    {seatData?.name}
                  </div>
                );
              })
            )}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
    // <div
    //   ref={parentRef}
    //   className="overflow-auto w-full h-full"
    //   style={{
    //     width: cols * seatSize,
    //     height: rows * seatSize,
    //     position: 'relative',
    //   }}
    // >
    //   <div
    //     style={{
    //       width: colVirtualizer.getTotalSize(),
    //       height: rowVirtualizer.getTotalSize(),
    //       position: 'relative',
    //     }}
    //   >
    //     {rowVirtualizer.getVirtualItems().map((virtualRow) => (
    //       <React.Fragment key={virtualRow.key}>
    //         {colVirtualizer.getVirtualItems().map((virtualCol) => {
    //           const rowIndex = virtualRow.index;
    //           const colIndex = virtualCol.index;
    //           const key = `${rowIndex}-${colIndex}`;
    //           const seatData = selectedSeats.find((s) => s.id === key);;
    //           const isSelected = Boolean(seatData);

    //           return (
    //             <div
    //               key={key}
    //               onClick={()=>{
    //                 if(seatData){
    //                   setSeatConfig({...seatData})
    //                 }
    //               }}
    //               onDoubleClick={() => toggleSeat(key)}
    //               className={clsx(
    //                 'absolute border rounded cursor-pointer text-white text-center flex items-center justify-center text-xs',
    //                 isSelected ? '' : 'bg-gray-200 hover:bg-gray-300'
    //               )}
    //               style={{
    //                 top: virtualRow.start,
    //                 left: virtualCol.start,
    //                 width: seatSize - 4,
    //                 height: seatSize - 4,
    //                 backgroundColor: seatData?.color ?? undefined,
    //               }}
    //             >
    //               {seatData?.name || key}
    //             </div>
    //           );
    //         })}
    //       </React.Fragment>
    //     ))}
    //   </div>
    // </div>
  );
};
