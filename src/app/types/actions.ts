export type ActionResponse<T> =
  | {
      data: T
      errors?: null
    }
  | {
      data?: null
      errors: string[]
    }
  | undefined
