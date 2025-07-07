export interface SeatCategorySummary {
  total_seats: number;
  booked_seats: number;
}

export type ShowSeatSummary = {
  [category: string]: SeatCategorySummary;
};

export interface BookedSeatsSummary {
  booked_seats: {
    [showId: string]: ShowSeatSummary;
  };
}