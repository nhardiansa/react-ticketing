import { useBookedSeats } from "@/context/BookedSeatsContext";
import { BookedSeatsProvider } from "@/context/BookedSeatsProvider";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { SelectShowBookedSeat } from "../select-show-booked-seat";
import { CELL_SIZE, COLS, ROWS } from "@/config/config";
import { CarouselImages } from "../carousel-images";
import { SelecCategory } from "../select-category";

const HomePage = () => {
    return (
        <BookedSeatsProvider>
            <GRID />
        </BookedSeatsProvider>
    );
};

export default HomePage;

function GRID() {
    const { seats, bookedSeats, selectedShow, selectedCategory } = useBookedSeats();

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="my-4">

                <SelectShowBookedSeat />
            </div>
            <h1 className="text-xl lg:text-4xl font-semibold text-center uppercase">
                {`ITTIBA' ${selectedShow} SOLO`}
            </h1>
            <CarouselImages />
            <h1 className="text-xl lg:text-4xl font-semibold text-center uppercase mt-5">
                {`Pilihan Kursi`}
            </h1>
            <SelecCategory />
            <div className="w-full h-100 overflow-auto relative">
                <TransformWrapper
                    minScale={0.1}
                    initialScale={0.1}
                    wheel={{ step: 0.05 }}
                    doubleClick={{ disabled: true }}
                >
                    <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>

                        <div
                            style={{
                                width: COLS * CELL_SIZE,
                                height: ROWS * CELL_SIZE,
                                position: "relative",
                            }}
                        >
                            {[...Array(ROWS)].flatMap((_, rowIndex) =>
                                [...Array(COLS)].map((_, colIndex) => {
                                    const index = rowIndex * COLS + colIndex;
                                    const key = `${rowIndex}-${colIndex}`;
                                    const seatData = seats.find((s) => s.position === key);
                                    const isBooked = seatData ? Boolean(bookedSeats.find((s) => s.seat_id === seatData!.id)) : false;

                                    if (seatData?.category != selectedCategory && selectedCategory != "all" && seatData?.category != "STAGE") {
                                        return (<div
                                            key={index}
                                            style={{
                                                position: "absolute",
                                                top: rowIndex * CELL_SIZE,
                                                left: colIndex * CELL_SIZE,
                                                width: CELL_SIZE - 2,
                                                height: CELL_SIZE - 2,
                                                backgroundColor: seatData ? "grey" : "white",
                                                border: "1px solid white",
                                                boxSizing: "border-box",
                                                fontSize: 10,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "white",
                                            }}
                                        >
                                        </div>);
                                    }
                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                position: "absolute",
                                                top: rowIndex * CELL_SIZE,
                                                left: colIndex * CELL_SIZE,
                                                width: CELL_SIZE - 2,
                                                height: CELL_SIZE - 2,
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
                                            <div className="flex flex-col justify-center items-center text-center">
                                                <p className="text-[15px] font-bold">{isBooked ? 'Booked' : seatData?.name}</p>
                                                <p className="text-[10px]">{seatData?.category}</p>
                                            </div>
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
