export type HomeDataGET = {
  isLogin: boolean,
  isCurrentlyHeld: boolean,
  submittedFileName: string|null,
  contest: ContestData
}

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