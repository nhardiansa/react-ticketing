import { useEffect, useRef } from "react";
import { SeatGrid } from "../seat-grid"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { FormSeatConfig } from "../form-seat-config";
import { SeatsProvider } from "@/context/SeatsProvider";

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
            <div className="flex flex-col items-center min-h-screen">
                <FormSeatConfig />
                {/* Zoom Pan Area */}
                <TransformWrapper
                    initialScale={1}
                     minScale={0.05}
                    maxScale={5}
                    wheel={{ step: 50 }}
                    doubleClick={{ disabled: true }}
                    pinch={{ step: 5 }}
                    centerOnInit
                >
                    <TransformComponent>
                        
                            <SeatGrid cols={113} rows={50} seatSize={60} />
                        
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </SeatsProvider>
    )
}
