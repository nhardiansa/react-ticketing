import type { Seat } from '@/types/seat';
import axios, { admin_api } from './axios';

export const findSeats = async (): Promise<Seat[]> => {
  const res = await axios.get("/api/seats");
  return res.data.data as Seat[];
};

export const postSeat = async (seat: Seat): Promise<void> => {
  await admin_api.post("/admin_api/seats", seat);
};

export const deleteSeat = async (id: string): Promise<void> => {
  await admin_api.delete(`/admin_api/seats/${encodeURIComponent(id)}`);
};

export const putSeat = async (id: string, seat: Seat): Promise<void> => {
  await admin_api.put(`/admin_api/seats/${encodeURIComponent(id)}`, seat);
};
