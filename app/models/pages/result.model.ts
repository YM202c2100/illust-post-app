import { RankPoints } from "../rankTier.model"
import { LoginChecker, SubmitChecker } from "./common.model"

export type ResultDataGET = {
  rankPosition: number,
  totalNumCompetitors: number,
  top3Images: ImageWithRP[],
  beforeRP: RankPoints,
  myImage: ImageWithRP,
  higherRankImages: ImageWithRP[],
  prevContestInfo: ContestWithoutPeriodInfo

  ,debug: string
} & LoginChecker
  & SubmitChecker

export type ImageWithRP = {
  file_name: string,
  user_name: string,
  rank_points: RankPoints
}

export type ContestWithoutPeriodInfo = {
  round_num: number,
  subject: string
}