<?php
namespace db;

require_once __DIR__."/libs/dbConnection.php";
require_once __DIR__."/../models/storingModel/contest.model.php";
use models\ContestModel;


class ContestsQuery {
  public static function fetchLatestContestInfo():ContestModel{
    $db = new DbConnection();

    $sql = "SELECT * from contests
            order by round_num desc
            limit 1";
    return $db->fetch($sql, [], ContestModel::class, fetchOne:true);
  }
}
