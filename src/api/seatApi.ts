import type { Seat } from '@/types/seat';
import axios from './axios';

export const findSeats = async (): Promise<Seat[]> => {
  const res = await axios.get("/api/seats");
  return res.data.data as Seat[];
};

export const postSeat = async (seat: Seat): Promise<void> => {
  await axios.post("/api/seats", seat);
};

export const deleteSeat = async (id: string): Promise<void> => {
  await axios.delete(`/api/seats/${encodeURIComponent(id)}`);
};

export const putSeat = async (id: string, seat: Seat): Promise<void> => {
  await axios.put(`/api/seats/${encodeURIComponent(id)}`, seat);
};
