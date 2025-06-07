import { useBookedSeats } from '@/context/BookedSeatsContext';
import { Badge } from './ui/badge';

export default function CartSeats() {
    const { selectedSeats } = useBookedSeats();
    return (
        <div className="flex gap-2">
            {selectedSeats.map((seat) => <Badge key={seat.id} variant="outline" className='text-white font-bold uppercase' style={{backgroundColor:seat.color}}>{seat.name}</Badge>)}
        </div>

    )
}
