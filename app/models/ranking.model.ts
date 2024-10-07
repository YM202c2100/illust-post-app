export type RankingDataGET = {
  isLogin: boolean,
  isSubmitted: boolean,
  rankPosition: number,
  totalNumCompetitors: number,
  top3Images: ImageWithRP[],
  myImageSrc: string,
  myRankPoints: number
  higherRankImages: ImageWithRP[]
}

export type ImageWithRP = {
  file_name: string,
  user_name: string,
  rank_points: number
}