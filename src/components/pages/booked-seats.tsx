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
import { FormBookedSeatDialog } from "../dialog/form-booked-seat-dialog"
import { SelecShow } from "../select-show"
import BookedSeatsSocket from "../booked-seat-socket"

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
                                    <SelecShow />
                                    <Button onClick={() => {
                                        setOpenDialog(true);
                                    }}>
                                        <span><IconShoppingCart /></span>
                                        Booking Seat
                                    </Button>
                                    <CartSeats />
                                </div>
                                <BookedSeatsSocket>
                                    <BookedSeats cols={115} rows={50} seatSize={50} />
                                </BookedSeatsSocket>
                            </div>
                        </div>
                        <FormBookedSeatDialog isOpen={openDialog} onOpenChange={setOpenDialog} />
                    </div>
                </SidebarInset>
            </BookedSeatsProvider>
        </SidebarProvider>
    )
}