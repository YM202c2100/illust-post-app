<?php
namespace db;

require_once __DIR__."/libs/dbConnection.php";
require_once __DIR__."/../models/responseModel/home.model.php";
use models\ContestRecieveModel;
use PDO;

class ContestsQuery {
  public static function fetchLatestContestInfo():ContestRecieveModel{
    $db = new DbConnection();

    $sql = "SELECT * from contests
            order by round_num desc
            limit 1";
    return $db->fetch($sql, [], PDO::FETCH_CLASS, ContestRecieveModel::class, fetchOne:true);
  }
}
