import { YearSelect } from './YearSelect'

export const Header = async () => {
  return (
    <header className='flex h-20 items-center border-b-2 px-4 py-4'>
      <div className='h-10 w-10 overflow-hidden rounded-full'>
        <div className='h-1/2 w-full bg-blue-300' />
        <div className='h-1/2 w-full bg-yellow-300' />
      </div>

      <div className='ml-4 text-2xl font-bold text-gray-700'>
        простий калькулятор податків
      </div>

      <div className='ml-auto'>
        <YearSelect />
      </div>
    </header>
  )
}
