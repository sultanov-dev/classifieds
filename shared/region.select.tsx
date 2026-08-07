import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { regionData } from '@/data/region.data'

interface RegionSelectProps {
  value: string
  onValueChange: (value: string | null) => void
  placeholder?: string
}

export default function RegionSelect({
  value,
  onValueChange,
  placeholder = 'Viloyatni tanlang',
}: RegionSelectProps) {
  return (
    <Select items={regionData} value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-90" side="bottom" alignItemWithTrigger={false}>
        <SelectGroup>
          {regionData.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
