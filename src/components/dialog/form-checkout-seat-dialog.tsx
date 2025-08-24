import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useBookedSeats } from "@/context/BookedSeatsContext";
import { SearchTicket } from "../search-ticket";
import { useEffect } from "react";

interface FormCheckoutSeatDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function FormCheckoutSeatDialog({ isOpen, onOpenChange }: FormCheckoutSeatDialogProps) {
    const { seats, authSelectedSeats, claimBookingSeats, tickets } = useBookedSeats();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent reload

        // check if there are error in authSelectedSeats
        // like if there is no ticket_id
        // or if there are duplicate ticket_id
        const ticketIds = authSelectedSeats.map((seat) => seat.ticket_id);

        console.log(authSelectedSeats);


        if (checkForDuplicates(ticketIds)) {
            alert("Terdapat kesalahan pada pemilihan kursi. Pastikan semua kursi memiliki ID tiket yang valid dan tidak ada duplikat.");
            return;
        }

        await claimBookingSeats();
        onOpenChange(false); // close dialog after submit
    };

    useEffect(() => {
        console.log("Tickets in FormCheckoutSeatDialog:", tickets);
    }, [tickets]);

    function checkForDuplicates(array: (string | undefined)[]): boolean {
        return new Set(array).size !== array.length
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Booked Seat</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="mt-4 flex flex-col gap-2">
                            {authSelectedSeats.map((locked) => {
                                const seat = seats.find((s) => s.id === locked.seat_id);
                                return <div key={locked.seat_id} className="flex flex-row items-center border py-2 px-2 gap-2">
                                    <div className="p-2 flex flex-col items-center justify-center w-20 text-white rounded-lg" style={{ backgroundColor: seat?.color ?? '' }}>
                                        <div className="font-bold">{seat?.name}</div>
                                        <div className="text-sm">{seat?.category}</div>
                                    </div>
                                    <div className="w-full">
                                        <SearchTicket seat={seat!} />
                                        {/* <Input id="ticket_id" name="ticket_id" value={data.ticket_id} onChange={handleChange} /> */}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
