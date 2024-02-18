import * as usersColInfo from './users'
import * as verificationCodesColInfo from './verificationCodes'

export const collections = {
  [verificationCodesColInfo.name]: verificationCodesColInfo.collection,
  [usersColInfo.name]: usersColInfo.collection,
} as const
