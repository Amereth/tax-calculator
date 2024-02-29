'use client'

import { useYears } from '@/features/income/hooks/useYears'
import { usePathname, useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export const YearSelect = () => {
  const router = useRouter()

  const { data } = useYears()

  const pathname = usePathname()
  const year = pathname.split('/')[1]

  return (
    <Select value={year} onValueChange={(v) => router.push(v)}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {data?.years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
        <SelectItem value='add-year'>add year</SelectItem>
      </SelectContent>
    </Select>
  )
}
