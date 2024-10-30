import { LoginChecker } from "./common.model"

export type HomeDataGET = {
  submittedFileName: string|null,
  contest: ContestData,
  limitCanJudge: number|null,
  rankPoints: number
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