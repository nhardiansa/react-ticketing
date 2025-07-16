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
      <SelectTrigger className="w-[180px] border-2 border-black font-bold text-xl">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Show Category</SelectLabel>
          <SelectItem value="all">All Category</SelectItem>
          {seatCategories.map((category)=><SelectItem key={category} value={category}>{category}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
