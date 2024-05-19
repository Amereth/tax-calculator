export type ActionResponse<T> =
  | {
      data: T
      errors?: never
    }
  | {
      data?: never
      errors: string[]
    }
