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

export function SelecCategory() {
const {toggleSelectCategory, selectedCategory, seatCategories} = useBookedSeats();
  return (
    <Select value={selectedCategory} onValueChange={(value) => toggleSelectCategory(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Show" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Show</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          {seatCategories.map((category)=><SelectItem value={category}>{category}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
