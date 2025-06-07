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

export function SelecShow() {
const {toggleSelectShow, selectedShow} = useBookedSeats();
  return (
    <Select value={selectedShow} onValueChange={(value) => toggleSelectShow(value)}>
      <SelectTrigger className="w-[180px]">
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
