import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useBookedSeats } from "@/context/BookedSeatsContext"

export function SelectShowBookedSeat() {
const {toggleSelectShow, selectedShow} = useBookedSeats();
  return (
    <Select value={selectedShow} onValueChange={(value) => toggleSelectShow(value)}>
      <SelectTrigger className="w-[180px] border-2 border-black font-bold text-xl">
        <SelectValue placeholder="Select Show" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Show</SelectLabel>
          <SelectItem value="reconnect">Reconnect</SelectItem>
          <SelectItem value="disconnect">Disconnect</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
