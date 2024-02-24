import { db } from '@/lib/db'
import { Collection } from 'mongodb'
import { ZodSchema } from 'zod'

export class DbCollection<
  S extends Record<string, unknown>,
  CreateFunc = unknown,
> {
  public db: Collection<S>

  constructor(
    public name: string,
    public schema: ZodSchema<S>,
    public createOne: CreateFunc,
  ) {
    this.name = name
    this.schema = schema
    this.db = db.collection<S>(name)
    this.createOne = createOne
  }
}
