import { useBookedSeats } from "@/context/BookedSeatsContext";
import { BookedSeatsProvider } from "@/context/BookedSeatsProvider";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { SelecShow } from "../select-show";
const rows = 50;
const cols = 113;
const cellSize = 50;

const HomePage = () => {
    return (
        <BookedSeatsProvider>
            <GRID></GRID>
        </BookedSeatsProvider>
    );
};

export default HomePage;

function GRID() {
    const { seats, bookedSeats, selectedShow } = useBookedSeats();
    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-5 m-5">
                <SelecShow />
                <h1 className="text-2xl uppercase">{`ITTIBA ${selectedShow}- SOLO / 20 JULI 2025`}</h1>
            </div>
            <div
                className="w-screen h-[90vh] overflow-auto relative"
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
                                width: cols * cellSize,
                                height: rows * cellSize,
                                position: "relative",
                            }}
                        >
                            {[...Array(rows)].flatMap((_, rowIndex) =>
                                [...Array(cols)].map((_, colIndex) => {
                                    const index = rowIndex * cols + colIndex;
                                    const key = `${rowIndex}-${colIndex}`;
                                    const seatData = seats.find((s) => s.id === key);
                                    const isBooked = Boolean(bookedSeats.find((s) => s.seat_id === key));
                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                position: "absolute",
                                                top: rowIndex * cellSize,
                                                left: colIndex * cellSize,
                                                width: cellSize - 2,
                                                height: cellSize - 2,
                                                backgroundColor: isBooked ? "black" : seatData ? seatData.color : "white",
                                                border: "1px solid white",
                                                boxSizing: "border-box",
                                                fontSize: 10,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "white",
                                            }}
                                        >
                                            {isBooked?'Booked':seatData?.name}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </div>
    );
}