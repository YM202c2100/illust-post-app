<?php
namespace db;

require_once __DIR__."/libs/dbConnection.php";
require_once __DIR__."/../models/home.model.php";
use models\ContestRecieveModel;
use PDO;

class ContestsQuery {
  static $currentId;
  static $nextScheduledId;
  static $prevContestId;

  public static function setCurrentContestId(){
    $db = new DbConnection();
    $sql = "SELECT id
            FROM contests
            WHERE NOW() BETWEEN application_start_date AND judge_end_date";
            
    static::$currentId = $db->fetch($sql, fetchOne:true);
  }

  public static function setNextScheduledId(){
    $db = new DbConnection();
    $sql = "SELECT id from contests
            where now() < application_start_date 
            order by application_start_date 
            limit 1";

    static::$nextScheduledId = $db->fetch($sql, fetchOne:true);
  }

  public static function setPrevContestId(){
    $db = new DbConnection();

    ContestsQuery::setCurrentContestId();
    if(empty(ContestsQuery::$currentId)){
      ContestsQuery::setNextScheduledId();
    }
    $latestId = ContestsQuery::$currentId ?? ContestsQuery::$nextScheduledId;

    $sql = "SELECT id from contests
            where round_num = (
              select round_num - 1 from contests
              where id = {$latestId})";

    static::$prevContestId = $db->fetch($sql, [], fetchOne:true);
  }

  public static function fetchContestInfo():ContestRecieveModel{
    $db = new DbConnection();

    $contest_id = ContestsQuery::$currentId ?? ContestsQuery::$nextScheduledId;
    $sql = "SELECT * from contests
            where id = {$contest_id}";
    return $db->fetch($sql, [], PDO::FETCH_CLASS, ContestRecieveModel::class, fetchOne:true);
  }
}
