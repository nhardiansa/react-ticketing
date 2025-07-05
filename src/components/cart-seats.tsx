import { useBookedSeats } from '@/context/BookedSeatsContext';
import { Badge } from './ui/badge';

export default function CartSeats() {
    const { seats, authSelectedSeats } = useBookedSeats();
    return (
        <div className="flex gap-2">
            {authSelectedSeats.map((locked) => {
                const seat = seats.find((s) => s.id === locked.seat_id);
                return <Badge key={seat!.position} variant="outline" className='text-white font-bold uppercase' style={{ backgroundColor: seat?.color }}>{seat?.name}</Badge>
            })}
        </div>

    )
}
