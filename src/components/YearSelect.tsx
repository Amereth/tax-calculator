'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export const YearSelect = ({ years }: { years: string[] }) => {
  const router = useRouter()

  const pathname = usePathname()
  const year = pathname.split('/')[1]

  return (
    <Select value={year} onValueChange={(v) => router.push(v)}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
        <SelectItem value='add-year'>add year</SelectItem>
      </SelectContent>
    </Select>
  )
}
