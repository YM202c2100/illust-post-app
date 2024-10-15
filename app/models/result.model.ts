import { LoginChecker, SubmitChecker } from "./common.model"

export type ResultDataGET = {
  rankPosition: number,
  totalNumCompetitors: number,
  top3Images: ImageWithRP[],
  beforeRP: number|null,
  myImage: ImageWithRP,
  higherRankImages: ImageWithRP[]

  ,debug: string
} & LoginChecker
  & SubmitChecker

export type ImageWithRP = {
  file_name: string,
  user_name: string,
  rank_points: number
}