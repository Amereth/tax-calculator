import { verificationCodesCollection } from './verificationCodes'

export const collections = {
  [verificationCodesCollection.name]: verificationCodesCollection,
} as const
