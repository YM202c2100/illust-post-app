<?php
namespace db;

require_once __DIR__."/libs/dbConnection.php";
require_once __DIR__."/../models/home.model.php";
use models\ContestRecieveModel;
use PDO;

class ContestsQuery {
  static $currentId;
  static $prevContestId;

  public static function setCurrentContestId(){
    $db = new DbConnection();
    $sql = "SELECT id
            FROM contests
            WHERE NOW() BETWEEN application_start_date AND judge_end_date";
            
    static::$currentId = $db->fetch($sql, fetchOne:true);
  }

  public static function setPrevContestId($offset=1){
    $db = new DbConnection();

    if(empty(ContestsQuery::$currentId)){
      ContestsQuery::setCurrentContestId();
    }

    $sql = "SELECT id from contests
            where round_num = (
              select round_num - {$offset} from contests
              where id = ". ContestsQuery::$currentId . ")";

    static::$prevContestId = $db->fetch($sql, [], fetchOne:true);
  }

  public static function fetchContestInfo($contestId):ContestRecieveModel{
    $db = new DbConnection();

    $sql = "SELECT * from contests
            where id = :contest_id";
    return $db->fetch($sql, [':contest_id'=>$contestId], PDO::FETCH_CLASS, ContestRecieveModel::class, fetchOne:true);
  }
}
