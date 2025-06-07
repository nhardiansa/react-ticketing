import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBookedSeats } from "@/context/BookedSeatsContext";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface FormBookedSeatDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function FormBookedSeatDialog({ isOpen, onOpenChange }: FormBookedSeatDialogProps) {
    const [data, setData] = useState<{ name: string, ticket_id: string }>({ name: "", ticket_id: "" });
    const { selectedSeats, claimBookingSeats } = useBookedSeats();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent reload
        await claimBookingSeats(data.name,data.ticket_id);
        onOpenChange(false); // close dialog after submit
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                <DialogHeader>
                    <DialogTitle>Booked Seat</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="mt-4 grid gap-2 grid-cols-6">
                        {selectedSeats.map((seat) => {
                            return <Badge key={seat.id} variant="outline" className="text-white font-bold uppercase" style={{ backgroundColor: seat.color }}>{seat.name}</Badge>
                        })}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={data.name} onChange={handleChange} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="ticket_id">Invoice ID Darisini</Label>
                        <Input id="ticket_id" name="ticket_id" value={data.ticket_id} onChange={handleChange} />
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
