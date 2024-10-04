export type HomeResData = {
  isLogin: boolean,
  submittedFileName: string|null,
  contest: ContestInfo
}

type ContestInfo = {
  round_num: number
  subject: string
  applicationPeriod: ResPeriod,
  judgePeriod: ResPeriod
}

type ResPeriod = {
  start_at: string,
  ent_at: string
}