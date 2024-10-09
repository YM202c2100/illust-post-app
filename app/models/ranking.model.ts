export type RankingDataGET = {
  isLogin: boolean,
  isSubmitted: boolean,
  rankPosition: number,
  totalNumCompetitors: number,
  top3Images: ImageWithRP[],
  beforeRP: number|null,
  myImage: ImageWithRP,
  higherRankImages: ImageWithRP[]

  ,debug: string
}

export type ImageWithRP = {
  file_name: string,
  user_name: string,
  rank_points: number
}