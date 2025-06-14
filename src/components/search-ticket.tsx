import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBookedSeats } from "@/context/BookedSeatsContext"
import type { Ticket } from "@/types/ticket"
import type { Seat } from "@/types/seat"

interface SearchTicketProps {
    seat: Seat;
}

export function SearchTicket({ seat }: SearchTicketProps) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Ticket | null>(null)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const { tickets, searchTicketsByID, handleSelectedTicket } = useBookedSeats();

    const handleSearch = async (id: string) => {
        setSearch(id);
        if (id.length > 3) {
            setLoading(true);
            await searchTicketsByID(id);
            setLoading(false);
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between">
                    {selected ? <div className="flex flex-row text-sm gap-2">
                        <div>{selected.id}</div>
                        <div>{selected.name}</div>
                    </div> : "Ticket ID Darisini ..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder="Ticket ID Darisini"
                        value={search}
                        onValueChange={handleSearch}
                    />
                    <CommandEmpty>
                        {loading ? "Loading..." : "No results found."}
                    </CommandEmpty>
                    <CommandGroup>
                        {tickets.map((item) => (
                            <CommandItem
                                key={item.id}
                                value={item.id}
                                onSelect={() => {
                                    handleSelectedTicket(item,seat);
                                    setSelected(item);
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selected?.id === item.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                <div className="flex flex-col">
                                    <div className="">{item.name}</div>
                                    <div className="">{item.email}</div>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
