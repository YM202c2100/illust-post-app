import { LoginChecker } from "./common.model"

export type PostDataGET = {
  isWithinPeriod: boolean,
  submittedImage: string|null
} & LoginChecker