"use client"
import { useSeats } from "@/context/SeatsContext";

export function SeatCountByCateogry() {
    const { countByCategory } = useSeats();
    if (!countByCategory) return null;

    const totalSeats = Object.entries(countByCategory)
    .filter(([key]) => key !== "STAGE")
    .reduce((acc, [, value]) => acc + value.total, 0);

    if (countByCategory) {
        return (<div className="flex flex-row justify-start m-5 gap-2">
            <div className="flex flex-row items-center gap-2 font-semibold">
                <span className="text-gray-700">Total Kursi:</span>
                <span>{totalSeats}</span>
            </div>
            {Object.entries(countByCategory).map(([category, { total, color }]) => (
                <div key={category} className="flex flex-row items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
                    <span>{category}: {total}</span>
                </div>
            ))}
        </div>)
    } else {
        return <></>
    }
}