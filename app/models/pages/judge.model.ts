import { LoginChecker, SubmitChecker } from "./common.model"

export type JudgeDataGET = {
  isWithinPeriod: boolean,
  limitCanJudge: number,
  imagesToJudge: ImageToJudge[]
} & LoginChecker
  & SubmitChecker

export type ImageToJudge = {
  user_id: string,
  file_name: string
}