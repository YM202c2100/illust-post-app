<?php
namespace db;

require_once __DIR__."/libs/dbConnection.php";
require_once __DIR__."/../models/RecieveModel/contest.recieve.php";
require_once __DIR__."/../models/RecieveModel/history.recieve.php";
use models\ContestRecieveModel;
use models\HistoryReceiveModel;
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
    if(empty($latestContestId)){
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

  public static function fetchContestHistory($userId){
    $db = new DbConnection();
    $sql = "SELECT con.round_num, con.subject, com.rank_points, img.file_name 
              from illust_post.contests con 
              inner join illust_post.competitors com 
                on com.contest_id = con.id 
              inner join illust_post.images img 
                on img.contest_id = com.contest_id
                and img.user_id = com.user_id 
            where now() > con.judge_end_date
              and com.user_id = :user_id
            order by con.round_num  asc";

    return $db->fetch($sql, [':user_id'=>$userId], PDO::FETCH_CLASS, HistoryReceiveModel::class);
  }
}
