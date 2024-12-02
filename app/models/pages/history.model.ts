import { LoginChecker } from "./common.model"

export type HistoryDataGET = {
  history:HistoryElem[]
} & LoginChecker

export type HistoryElem = {
  contest:ContestOverview,
  rankPoints:number,
  filePath:string
}

export type ContestOverview = {
  roundNum:number,
  subject:string
}