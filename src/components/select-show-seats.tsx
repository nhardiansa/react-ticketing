import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSeats } from "@/context/SeatsContext";

export function SelectShowSeat() {
const {toggleSelectShow, selectedShow} = useSeats();
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
