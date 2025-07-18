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
  // Categories to exclude (also in lowercase)
  const excludeCategories = ["stage", "hijab","mesin","free-tribun"];

  // Normalize to lowercase, then filter and sort
  const processed = seatCategories
  .map(category => category.toLowerCase()) // ensure lowercase
  .filter(category => !excludeCategories.includes(category)) // remove unwanted
  .sort(); // sort ascending
  
  return (
    <Select value={selectedCategory} onValueChange={(value) => toggleSelectCategory(value)}>
      <SelectTrigger className="w-[180px] border-2 border-black font-bold text-xl">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Show Category</SelectLabel>
          <SelectItem value="all">All Category</SelectItem>
          {processed.map((category)=><SelectItem key={category} value={category} className="uppercase">{category}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
