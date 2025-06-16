import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useBookedSeats } from "@/context/BookedSeatsContext";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface FormBookedSeatDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function FormBookedSeatDialog({ isOpen, onOpenChange }: FormBookedSeatDialogProps) {
    const { bookedSeat } = useBookedSeats();

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form>
                    <DialogHeader>
                        <DialogTitle>Booked Seat</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col mt-4 gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="id">ID</Label>
                            <Input id="id" name="id" value={bookedSeat?.id} readOnly />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="ticket_id">ID Ticket</Label>
                            <Input id="ticket_id" name="ticket_id" value={bookedSeat?.ticket_id} readOnly />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="show_id">Show</Label>
                            <Input id="show_id" name="show_id" value={bookedSeat?.show_id} readOnly />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={bookedSeat?.name} readOnly />
                        </div>
                        {/* <div className="grid gap-3">
                        <Label htmlFor="gender">Gender</Label>
                        <Input id="gender" name="gender" value={bookedSeat?.gender} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={bookedSeat?.email} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="phone" value={bookedSeat?.phone} />
                    </div> */}
                    </div>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        </DialogClose>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete booked seat {bookedSeat?.name} with ticket {bookedSeat?.ticket_id}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
