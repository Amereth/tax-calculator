'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { z } from 'zod'

const schema = z.number().nonnegative()

type ControlledInputProps = {
  value: number
  onSubmit: (value: number) => void
}

export const ControlledInput = ({
  value: _value,
  onSubmit: _onSubmit,
}: ControlledInputProps) => {
  const [value, setValue] = useState(_value.toString())
  const reset = () => setValue(_value.toString())

  useEffect(() => {
    setValue(_value.toString())
  }, [_value])

  const onChange = (newValue: string) => {
    if (newValue.match(/^-?\d*\.?\d*$/)) {
      setValue(newValue)
    }
  }

  const onSubmit = async () => {
    if (Number.parseFloat(value) === _value) return

    const verifiedValue = schema.safeParse(Number.parseFloat(value))

    if (verifiedValue.success) {
      _onSubmit(verifiedValue.data)
    }
  }

  return (
    <>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='col-span-2 h-8'
      />
      <Button
        size='icon'
        className='h-8 w-8 shrink-0 border-green-700 text-green-700'
        variant='outline'
        onClick={onSubmit}
        disabled={Number.parseFloat(value) === _value}
      >
        <CheckIcon size={16} />
      </Button>
      <Button
        size='icon'
        className='h-8 w-8 shrink-0 border-red-700 text-red-700'
        variant='outline'
        onClick={reset}
        disabled={Number.parseFloat(value) === _value}
      >
        <XIcon size={16} />
      </Button>
    </>
  )
}
