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
import { useTickets } from "@/context/TicketsContext"

interface FormTicketProps{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FormTicketDialog({ isOpen, onOpenChange }: FormTicketProps) {
    const { ticket, setTicket } = useTickets();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTicket({
            ...ticket,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //updateSeat();
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Ticket</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="id">ID</Label>
                        <Input id="id" name="id" value={ticket.id} onChange={handleChange} readOnly />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="ticket_name">Ticket Category</Label>
                        <Input id="ticket_name" name="ticket_name" value={ticket.ticket_name} onChange={handleChange} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="show_id">Show</Label>
                        <Input id="show_id" name="show_id" value={ticket.show_id} onChange={handleChange} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={ticket.name} onChange={handleChange} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="gender">Gender</Label>
                        <Input id="gender" name="gender" value={ticket.gender} onChange={handleChange} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={ticket.email} onChange={handleChange} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="phone" value={ticket.phone} onChange={handleChange} />
                    </div>       
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

