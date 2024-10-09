<?php
namespace db;

require_once __DIR__."/libs/dbConnection.php";
require_once __DIR__."/../models/ranking.model.php";

use models\ImageWithRP;
use PDO;

class ImagesQuery {

  private static $tableForImageWithRP = "
    images as img
      inner join users as u
        on img.user_id = u.id
      inner join competitors as comptr
        on img.user_id = comptr.user_id 
          and img.contest_id = comptr.contest_id";

  public static function uploadImage($fileName, $userId):bool{
    $db = new DbConnection();

    $sql = 'INSERT into images (user_id, contest_id, file_name) 
              values (:user_id,'. ContestsQuery::$currentId .', :file_name) 
            on duplicate key update 
              file_name = values(file_name)';

    $isSuccess = $db->execute($sql, [
      ':user_id'=>$userId,
      ':file_name'=>$fileName
    ]);

    return $isSuccess;
  }

  public static function fetchImagesToJudge($user_id, $rankPointsOfEvalator, $fetchHigher=true){
    $db = new DbConnection();
    // 評価する人より多くのポイントをもつユーザーの作品を6つ取得
    // まだ比較されていない作品を優先

    $compOperator = $fetchHigher ? ">=":"<=";
    $order = $fetchHigher ? "asc":"desc";

    $sql = "SELECT img.user_id, img.file_name 
            from images as img 
            inner join competitors as comptr 
              on img.user_id = comptr.user_id
                and img.contest_id = comptr.contest_id
            where comptr.rank_points {$compOperator} :rankPointsOfEvalator
              and comptr.user_id != :user_id
              and comptr.contest_id = ". ContestsQuery::$currentId ."
            order by comptr.judged_count asc,
              comptr.rank_points {$order}
            limit 6";

    return $db->fetch($sql, [':rankPointsOfEvalator'=>$rankPointsOfEvalator, ':user_id'=>$user_id], PDO::FETCH_ASSOC);
  }

  public static function fetchImagesTop3(){
    $db = new DbConnection();

    $sql = "SELECT img.file_name, u.user_name, comptr.rank_points
            from ". ImagesQuery::$tableForImageWithRP ."
            where comptr.contest_id = ". ContestsQuery::$prevContestId ."
            order by comptr.rank_points desc
            limit 3";
    return $db->fetch($sql, fetchMode:PDO::FETCH_CLASS, outputModel:ImageWithRP::class);
  }

  public static function fetchNameByUserId($userId){
    $db = new DbConnection();
    $sql = "SELECT file_name
              from images
            where user_id = :user_id
              and contest_id = ". ContestsQuery::$currentId;

    return $db->fetch($sql, [':user_id'=>$userId], fetchOne:true);
  }

  public static function fetchPrevSubmission($userId){
    $db = new DbConnection();

    $sql = "SELECT img.file_name, u.user_name, comptr.rank_points
            from ". ImagesQuery::$tableForImageWithRP ."
            where u.id = :user_id
              and comptr.contest_id = ". ContestsQuery::$prevContestId;
    
    return $db->fetch($sql, ['user_id'=>$userId], PDO::FETCH_CLASS, ImageWithRP::class, fetchOne:true);
  }

  public static function fetchHigherRankThan($rankPoints){
    $db = new DbConnection();
    $sql = "SELECT img.file_name, u.user_name, comptr.rank_points
            from ". ImagesQuery::$tableForImageWithRP ."
            where comptr.rank_points > :rank_points + 150
              and comptr.contest_id = ". ContestsQuery::$prevContestId."
            limit 3";
    return $db->fetch($sql, ['rank_points'=>$rankPoints], PDO::FETCH_CLASS, ImageWithRP::class);
  }
}
