<?php
namespace db;

require_once __DIR__."/libs/dbConnection.php";
require_once __DIR__."/../models/RecieveModel/contest.recieve.php";
use models\ContestRecieveModel;
use PDO;

class ContestsQuery {
  static $targetId;

  public static function fetchCurrentContestId(){
    $db = new DbConnection();
    $sql = "SELECT id
            FROM contests
            WHERE NOW() BETWEEN application_start_date AND judge_end_date";
            
    return $db->fetch($sql, fetchOne:true);
  }

  public static function fetchNextScheduledId(){
    $db = new DbConnection();
    $sql = "SELECT id from contests
            where now() < application_start_date 
            order by application_start_date 
            limit 1";

    return $db->fetch($sql, fetchOne:true);
  }

  public static function fetchPrevContestId(){
    $db = new DbConnection();

    $latestContestId = ContestsQuery::fetchCurrentContestId();
    if(empty($latesteContestId)){
      $latestContestId = ContestsQuery::fetchnextScheduledId();
    }

    $sql = "SELECT id from contests
            where round_num = (
              select round_num - 1 from contests
              where id = {$latestContestId})";

    return $db->fetch($sql, [], fetchOne:true);
  }

  public static function fetchContestInfo():ContestRecieveModel{
    $db = new DbConnection();

    $sql = "SELECT * from contests
            where id = ". ContestsQuery::$targetId;
    return $db->fetch($sql, [], PDO::FETCH_CLASS, ContestRecieveModel::class, fetchOne:true);
  }
}
