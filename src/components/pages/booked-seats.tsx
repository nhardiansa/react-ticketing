import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

import { BookedSeatsProvider } from "@/context/BookedSeatsProvider"
import BookedSeats from "../booked-seats"
import { Button } from "../ui/button"
import { IconShoppingCart } from "@tabler/icons-react"
import CartSeats from "../cart-seats"
import { useState } from "react"
import { SelectShowBookedSeat } from "../select-show-booked-seat"
import BookedSeatsSocket from "../booked-seat-socket"
import { SelecCategory } from "../select-category"
import { FormCheckoutSeatDialog } from "../dialog/form-checkout-seat-dialog"
import { CELL_SIZE, COLS, ROWS } from "@/config/config"

export default function BookedSeatsPage() {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <BookedSeatsProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader title="Booked Seats" />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-2 m-4">
                                    <SelectShowBookedSeat />
                                    <SelecCategory />
                                    <Button onClick={() => {
                                        setOpenDialog(true);
                                    }}>
                                        <span><IconShoppingCart /></span>
                                        Booking Seat
                                    </Button>
                                    <CartSeats />
                                </div>
                                <BookedSeatsSocket>
                                    <BookedSeats cols={COLS} rows={ROWS} seatSize={CELL_SIZE} />
                                </BookedSeatsSocket>
                            </div>
                        </div>
                        <FormCheckoutSeatDialog isOpen={openDialog} onOpenChange={setOpenDialog} />
                    </div>
                </SidebarInset>
            </BookedSeatsProvider>
        </SidebarProvider>
    )
}
