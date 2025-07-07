
import type { BookedSeatsSummary } from '@/types/dashboard';
import { admin_api } from './axios';

export const getDashboardData = async (): Promise<BookedSeatsSummary> => {
    const res = await admin_api.get("/admin_api/dashboard");
    return res.data.data as BookedSeatsSummary;
};