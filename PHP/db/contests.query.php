<?php
namespace db;

require_once __DIR__."/libs/dbConnection.php";
require_once __DIR__."/../models/home.model.php";
use models\ContestRecieveModel;
use PDO;

class ContestsQuery {
  static $currentId;

  public static function setCurrentContestId(){
    $db = new DbConnection();
    $sql = "SELECT id from contests
            order by round_num desc
            limit 1";
    static::$currentId = $db->fetch($sql, fetchOne:true);
  }

  public static function fetchContestInfo($contestId):ContestRecieveModel{
    $db = new DbConnection();

    $sql = "SELECT * from contests
            where id = :contest_id";
    return $db->fetch($sql, [':contest_id'=>$contestId], PDO::FETCH_CLASS, ContestRecieveModel::class, fetchOne:true);
  }
}
