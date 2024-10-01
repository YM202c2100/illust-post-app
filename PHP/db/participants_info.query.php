<?php
namespace db;

require_once "../db/dbConnection.php";
require_once "../db/libs/helper.php";
require_once "../db/participants_info.query.php";
require_once "../models/user.model.php";
require_once "../models/ranking.model.php";
use models\ParticipantModel;
use models\RankingModel;
use models\UserModel;

class ParticipantsQuery {
  public static function getSubmitted($userId){
    $db = new DbConnection();

    $sql = "SELECT submitted from participants_info where user_id = :user_id";
    $participant = $db->select($sql, [':user_id'=>$userId], ParticipantModel::class);
    return $participant->submitted;
  }

  public static function updateSubmittedStatus($userId):bool{
    $db = new DbConnection();

    $sql = "UPDATE participants_info set submitted = true where user_id=:user_id";
    $isSuccess = $db->execute($sql, [':user_id'=>$userId]);
    return $isSuccess;
  }

  public static function getRankPointsOf(UserModel $user){
    $db = new DbConnection();

    $sql = "SELECT p_info.rank_points 
            from illust_post.participants_info as p_info 
            where p_info.user_id = :user_id";
    
    $rankPointStore = $db->select($sql, [':user_id'=>$user->id], ParticipantModel::class);
    return $rankPointStore->rank_points;
  }

  public static function getRankPointsOfUsers($userIdList){
    $db = new DbConnection();

    $placeHolder = generatePlaceholderByLength(count($userIdList));
    $sql = "SELECT user_id, rank_points from participants_info 
            where user_id in ($placeHolder)";
    
    $participants = $db->fetchAllInArray($sql, $userIdList, ParticipantModel::class);

    $rankPointsOfUsers = [];
    foreach ($participants as $participant) {
      $rankPointsOfUsers[$participant->user_id] = $participant->rank_points;
    }

    return $rankPointsOfUsers;
  }

  public static function updateRankPointAndJudgedCount($updatedRPMap){
    $db = new DbConnection();

    $sql = "UPDATE participants_info 
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
            from participants_info
            where rank_points > (
              SELECT rank_points 
              from participants_info 
              where user_id = :user_id
            )";
    $result = $db->select($sql, [':user_id'=>$userId], RankingModel::class);
    return $result->rankPosition;
  }

  public static function getTotalNumParticipants(){
    $db = new DbConnection();
    $sql = "SELECT count(*) as totalNumParticipants from participants_info";

    $result = $db->select($sql, [], RankingModel::class);
    return $result->totalNumParticipants;
  }
}