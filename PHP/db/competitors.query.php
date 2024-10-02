<?php
namespace db;

require_once "../db/dbConnection.php";
require_once "../db/libs/helper.php";
require_once "../db/competitors.query.php";
require_once "../models/user.model.php";
require_once "../models/ranking.model.php";
use models\CompetitorModel;
use models\RankingModel;
use models\UserModel;

class CompetitorsQuery {
  public static function getSubmitted($userId){
    $db = new DbConnection();

    $sql = "SELECT submitted from competitors where user_id = :user_id";
    $isSubmitted = $db->fetch($sql, [':user_id'=>$userId], fetchOne:true);
    return $isSubmitted;
  }

  public static function updateSubmittedStatus($userId):bool{
    $db = new DbConnection();

    $sql = "UPDATE competitors set submitted = true where user_id=:user_id";
    $isSuccess = $db->execute($sql, [':user_id'=>$userId]);
    return $isSuccess;
  }

  public static function getRankPointsOf(UserModel $user){
    $db = new DbConnection();

    $sql = "SELECT comptr.rank_points 
            from illust_post.competitors as comptr 
            where comptr.user_id = :user_id";
    
    $rankPoints = $db->fetch($sql, [':user_id'=>$user->id], fetchOne:true);
    return $rankPoints;
  }

  public static function getAssocRankPointsOfUsers($userIdList){
    $db = new DbConnection();

    $placeHolder = generatePlaceholderByLength(count($userIdList));
    $sql = "SELECT user_id, rank_points from competitors 
            where user_id in ($placeHolder)";
    
    $rankPointsOfUsers = $db->fetch($sql, $userIdList, questionPlaceHolder:true, fetchKeyPair:true);

    return $rankPointsOfUsers;
  }

  public static function updateRankPointAndJudgedCount($updatedRPMap){
    $db = new DbConnection();

    $sql = "UPDATE competitors 
            set rank_points = :rank_points,
              judged_count = judged_count+1
            where user_id = :user_id";

    foreach ($updatedRPMap as $userId => $newPoints) {
      $db->execute($sql, [
        "user_id" => $userId,
        "rank_points" => $newPoints
      ]);
    }
  }

  public static function getRankPosition($userId){
    $db = new DbConnection();
    $sql = "SELECT count(*)+1 as rankPosition
            from competitors
            where rank_points > (
              SELECT rank_points 
              from competitors 
              where user_id = :user_id
            )";
    $rankPosition = $db->fetch($sql, [':user_id'=>$userId], fetchOne:true);
    return $rankPosition;
  }

  public static function getTotalNumCompetitors(){
    $db = new DbConnection();
    $sql = "SELECT count(*) as totalNumCompetitors from competitors";

    $totalNumCompetitors = $db->fetch($sql, fetchOne:true);
    return $totalNumCompetitors;
  }
}