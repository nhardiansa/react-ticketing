export interface SeatCategorySummary {
  total_seats: number;
  booked_seats: number;
  color: string;
}

export type ShowSeatSummary = {
  [category: string]: SeatCategorySummary;
};

export interface BookedSeatsSummary {
  booked_seats: {
    [showId: string]: ShowSeatSummary;
  };
   ticket_summary: TicketSummary; 
}

type TicketSummary = Record<string, Record<string, number>>;