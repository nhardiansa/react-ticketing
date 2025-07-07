import { getDashboardData } from "@/api/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BookedSeatsSummary } from "@/types/dashboard";
import { useEffect, useState } from "react";

export default function SummaryCards() {
    const [data, setData] = useState<BookedSeatsSummary>();
    
      useEffect(() => {
              const fetchData = async () => {
                  const data = await getDashboardData();
                  setData(data);
              };
      
              fetchData();
          }, []);

          if (!data) {
  return <div className="p-6 text-muted-foreground">No data available.</div>
    }
  return (
    <div className="px-6 space-y-6">
      {Object.entries(data.booked_seats).map(([showId, categories]) => (
        <div key={showId}>
          <h2 className="text-xl font-semibold mb-4 capitalize">{showId}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categories).map(([category, summary]) => (
              <Card key={category} className="rounded-2xl shadow">
                <CardHeader>
                  <CardTitle className="capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <div>Total Seats: <span className="font-semibold">{summary!.total_seats!}</span></div>
                    <div>Booked Seats: <span className="font-semibold">{summary!.booked_seats!}</span></div>
                    <div className="mt-2 text-xs text-gray-500 italic">
                      {summary?.booked_seats??0} / {summary?.total_seats??0} booked
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
