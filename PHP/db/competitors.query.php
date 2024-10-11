<?php
namespace db;

require_once __DIR__."/libs/dbConnection.php";
require_once __DIR__."/libs/helper.php";
require_once __DIR__."/competitors.query.php";
require_once __DIR__."/../models/ranking.model.php";
use PDO;

class CompetitorsQuery {
  public static function getIsSubmitted($userId, $contestId){
    $db = new DbConnection();
    $sql = "SELECT count(*) from competitors 
            where user_id = :user_id
              and contest_id = :contest_id";
              
    $isExisting = $db->fetch($sql, [':user_id'=>$userId, ':contest_id'=>$contestId], fetchOne:true);
    return (bool)$isExisting;
  }

  public static function fetchRankPoints($userId){
    $db = new DbConnection();

    $sql = "SELECT comptr.rank_points
            from competitors comptr
              inner join contests contest
              on comptr.contest_id = contest.id
            where comptr.user_id = :user_id
              and contest.id = ". ContestsQuery::$targetId;
    
    $rankPoints = $db->fetch($sql, [':user_id'=>$userId], fetchOne:true);
                  
    return $rankPoints;
  }

  public static function fetchRankPointsToJudgeOthers($userIdList){
    $db = new DbConnection();

    $placeHolder = generatePlaceholderByLength(count($userIdList));
    $sql = "SELECT user_id, rank_points from competitors 
            where user_id in ($placeHolder)
              and contest_id = ". ContestsQuery::$currentId;
    
    $rankPointsOfUsers = $db->fetch($sql, $userIdList, PDO::FETCH_KEY_PAIR, questionPlaceHolder:true);

    return $rankPointsOfUsers;
  }

  public static function fetchRankPointsBeforePrevContest($userId){
    $db = new DbConnection();

    $sql = "SELECT rank_points from competitors comptr
              inner join contests contest
                on comptr.contest_id = contest.id
            where comptr.user_id = :user_id
              and  contest.round_num = (
                select round_num-1 
                from contests
                where id = ". ContestsQuery::$prevContestId .")";
    
    return $db->fetch($sql, [':user_id'=>$userId], fetchOne:true);
  }

  public static function updateRankPointAndJudgedCount($updatedRPMap){
    $db = new DbConnection();

    $sql = "UPDATE competitors 
            set rank_points = :rank_points,
              judged_count = judged_count+1
            where user_id = :user_id
              and contest_id = ". ContestsQuery::$currentId;

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
                  and contest_id = ". ContestsQuery::$prevContestId .")
              and contest_id = ". ContestsQuery::$prevContestId;
    $rankPosition = $db->fetch($sql, [':user_id'=>$userId], fetchOne:true);
    return $rankPosition;
  }

  public static function getTotalNumCompetitors(){
    $db = new DbConnection();

    $sql = "SELECT count(*) 
            from competitors
            where contest_id = ". ContestsQuery::$prevContestId;

    $totalNumCompetitors = $db->fetch($sql, fetchOne:true);
    return $totalNumCompetitors;
  }

  public static function getLimitCanJudge($userId){
    $db = new DbConnection();

    $sql = "SELECT limit_can_judge 
              from competitors 
            where user_id = :user_id
              and contest_id = ". ContestsQuery::$targetId;
    
    return $db->fetch($sql, [':user_id'=>$userId], fetchOne:true);
  }

  public static function decrementLimitCanJudge($userId){
    $db = new DbConnection();

    $sql = "UPDATE competitors set 
              limit_can_judge = limit_can_judge-1 
            where user_id = :user_id
              and contest_id = ". ContestsQuery::$currentId;

    return $db->execute($sql, [':user_id'=>$userId]);
  }
}