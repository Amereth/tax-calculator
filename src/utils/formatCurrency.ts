export const formatCurrency = (value: number): string => {
  const formatter = new Intl.NumberFormat('uk-UA')

  return formatter.format(Number(value.toFixed(2)))
}
