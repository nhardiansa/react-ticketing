import { useEffect, useRef } from "react";
import { SeatGrid } from "../seat-layout-grid"
import { FormSeatConfig } from "../form-seat-config";
import { SeatsProvider } from "@/context/SeatsProvider";
import { CELL_SIZE, COLS, ROWS } from "@/config/config";
import { SeatCountByCateogry } from "../seat-count-by-category";

export default function SeatsLayoutPage() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            container.scrollLeft = container.scrollWidth / 2 - container.clientWidth / 2;
        }
    }, []);

    return (
        <SeatsProvider>
            <div className="flex flex-row items-center min-h-screen">
                <div className="w-1/4 h-screen overflow-y-auto" ref={scrollRef}>
                    <FormSeatConfig />
                </div>
                <div className="w-3/4 flex flex-col">
                    <SeatCountByCateogry />
                    <SeatGrid cols={COLS} rows={ROWS} seatSize={CELL_SIZE} />
                </div>
            </div>
        </SeatsProvider>
    )
}
