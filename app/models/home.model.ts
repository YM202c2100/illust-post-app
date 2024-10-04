export type HomeResData = {
  isLogin: boolean,
  submittedFileName: string|null,
  contest: ContestData
}

export type ContestData = {
  round_num: number
  subject: string
  applicationPeriod: ResPeriod,
  judgePeriod: ResPeriod
}

export type ResPeriod = {
  start_at: string,
  end_at: string
}