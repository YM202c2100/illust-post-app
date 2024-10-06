export type JudgeDataGET = {
  isLogin: boolean,
  isSubmitted: boolean,
  imagesToJudge: ImageToJudge[]
}

export type ImageToJudge = {
  user_id: string,
  file_name: string
}