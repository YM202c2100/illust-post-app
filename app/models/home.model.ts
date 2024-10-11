import { LoginChecker } from "./common.model"

export type HomeDataGET = {
  isCurrentlyHeld: boolean,
  submittedFileName: string|null,
  contest: ContestData
} & LoginChecker

export type ContestData = {
  roundNum: number
  subject: string
  applicationPeriod: PeriodData,
  judgePeriod: PeriodData
}

export type PeriodData = {
  startAt: string,
  endAt: string
}