export type HomeDataGET = {
  isLogin: boolean,
  submittedFileName: string|null,
  contest: ContestData
}

export type ContestData = {
  round_num: number
  subject: string
  applicationPeriod: PeriodData,
  judgePeriod: PeriodData
}

export type PeriodData = {
  start_at: string,
  end_at: string
}