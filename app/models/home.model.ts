import { LoginChecker } from "./common.model"

export type HomeDataGET = {
  submittedFileName: string|null,
  contest: ContestData,
  limitCanJudge: number|null,
  rankTier: RankTier
} & LoginChecker

export type RankTier = "bronze"|"silver"|"gold"|"diamond"|"master"

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