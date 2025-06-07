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
import { useSeats } from "@/context/SeatsContext"

interface FormSeatDialogProps{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FormSeatDialog({ isOpen, onOpenChange }: FormSeatDialogProps) {
    const { seatConfig, setSeatConfig, updateSeat } = useSeats();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSeatConfig({
            ...seatConfig,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateSeat();
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Seat</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="id">Seat ID</Label>
                        <Input id="id" name="id" value={seatConfig.id} onChange={handleChange} readOnly />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name / Seat Number</Label>
                        <Input id="name" name="name" value={seatConfig.name} onChange={handleChange} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" name="category" value={seatConfig.category} onChange={handleChange} />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="color">Color</Label>
                        <Input id="color" name="color" type="color" value={seatConfig.color} onChange={handleChange} />
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

