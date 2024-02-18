export type ActionResponse<T = unknown> =
  | {
      data: T
      errors?: null
    }
  | {
      data?: null
      errors: string[]
    }
  | undefined
