import { getDashboardData } from "@/api/dashboard"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { BookedSeatsSummary } from "@/types/dashboard"
import { useEffect, useState } from "react"
import { TicketSummaryTable } from "./table-ticket-summary"

export default function SummaryCards() {
  const [data, setData] = useState<BookedSeatsSummary>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboardData()
      setData(res)
    }

    fetchData()
  }, [])

  if (!data) {
    return <div className="p-6 text-muted-foreground">No data available.</div>
  }

  return (
    <div className="flex flex-col">
      <div className="p-4 space-y-6">
        {Object.entries(data.booked_seats).map(([showId, categories]) => (
          <div key={showId} className="space-y-2">
            <h2 className="text-lg font-semibold capitalize">{showId}</h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(categories).map(([category, summary]) => {
                const percent = Math.round(
                  (summary.booked_seats / summary.total_seats) * 100
                )

                return (
                  <Card key={category} className="rounded-xl border-muted">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="capitalize font-medium">{category}</span>
                        <Badge
                          className="text-xs"
                          style={{ backgroundColor: summary.color }}
                        >
                          {summary.booked_seats}/{summary.total_seats}
                        </Badge>
                      </div>
                      <Progress value={percent} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">
                        {percent}% booked
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <TicketSummaryTable ticketSummary={data.ticket_summary} />
    </div>

  )
}
