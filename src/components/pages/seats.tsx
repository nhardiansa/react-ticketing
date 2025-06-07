import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

import SeatVirtualizerFixed from "../seats-viltualizer-fixed"
import { SeatsProvider } from "@/context/SeatsProvider"
import { Button } from "../ui/button"
import { IconLayout } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"

export default function SeatsPage() {
    const navigate = useNavigate();
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Seats Layout" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col">
                            <div className="max-w-1 m-5"><Button onClick={() => navigate("/seats-layout")}><span><IconLayout /></span>Draw Layout</Button></div>
                            <SeatsProvider>
                                <SeatVirtualizerFixed cols={115} rows={50} seatSize={50} />
                            </SeatsProvider>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
