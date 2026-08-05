import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { regionData } from '@/data/region.data'

export default function RegionSelect() {
  return (
    <Select items={regionData} defaultValue={'toshkent shahri'}>
      <SelectTrigger className="max-w-40px">
        <SelectValue placeholder="Region" />
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
