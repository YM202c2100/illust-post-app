export type RankTier = "bronze"|"silver"|"gold"|"diamond"|"master"

export function getRankTierbyRP(rankPoints:number):RankTier{
  if(rankPoints < 1250){
    return "bronze";
  }else if(1250 <= rankPoints && rankPoints < 1500){
    return "silver";
  }else if(1500 <= rankPoints && rankPoints < 1750){
    return "gold";
  }else if(1750 <= rankPoints && rankPoints < 2000){
    return "diamond";
  }else{ //rankPoints >= 2000
    return "master";
  }
}