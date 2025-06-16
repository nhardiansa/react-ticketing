import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useTickets } from "@/context/TicketsContext";
import { Input } from "./ui/input";
import { IconSearch } from "@tabler/icons-react";

export function TableTickets() {
    const { tickets, search, handleSearch } = useTickets();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        handleSearch(value);
    };

    return (
        <>
            <div className="flex flex-row justify-between items-center gap-5 mx-5">
                <div className="w-full flex flex-row items-center gap-2"><IconSearch/><Input className="w-1/2" placeholder="Cari berdasarkan id , nama, email ..." value={search} onChange={handleChange} /></div>
                {/* <Button><span><IconPlus /></span>Tambah</Button> */}
            </div>
            <Table className="m-5">
                <TableCaption>A list of tickets</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Public ID</TableHead>
                        <TableHead className="w-40">Ticket Category</TableHead>
                        <TableHead className="w-40">Name</TableHead>
                        <TableHead className="w-10">Gender</TableHead>
                        <TableHead className="w-20">Email</TableHead>
                        <TableHead className="w-20">Phone</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets?.map((ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell className="font-medium">{ticket.id}</TableCell>
                            <TableCell>{ticket.ticket_name}</TableCell>
                            <TableCell>{ticket.name}</TableCell>
                            <TableCell>{ticket.gender}</TableCell>
                            <TableCell>{ticket.email}</TableCell>
                            <TableCell>{ticket.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
