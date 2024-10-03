<?php
namespace db;

require_once __DIR__."/libs/dbConnection.php";
require_once __DIR__."/../models/storingModel/image.model.php";

use models\ImageModel;
use models\ImageWithRP;

class ImagesQuery {
  public static function insert($fileName, $userId):bool{
    $db = new DbConnection();

    $sql = 'INSERT into images (file_name, user_id) values (:file_name, :user_id)';
    $isSuccess = $db->execute($sql, [
      ':file_name'=>$fileName,
      ':user_id'=>$userId
    ]);

    return $isSuccess;
  }

  public static function fetchImagesToJudge($rankPointsOfEvalator){
    $db = new DbConnection();
    // 評価する人より多くのポイントをもつユーザーの作品を2つ取得
    // まだ比較されていない作品を優先
    $sql = "SELECT img.user_id, img.file_name 
            from images as img 
            inner join competitors as comptr 
              on img.user_id = comptr.user_id
            where comptr.rank_points >= :rankPointsOfEvalator
            order by comptr.judged_count asc,
              comptr.rank_points asc 
            limit 2";

    return $db->fetch($sql, [':rankPointsOfEvalator'=>$rankPointsOfEvalator], ImageModel::class);
  }

  public static function fetchImagesTop3(){
    $db = new DbConnection();
    $sql = "SELECT img.file_name, u.user_name 
            from images as img
              inner join competitors as comptr
              	on img.user_id = comptr.user_id
              inner join users u
              	on img.user_id = u.id
            order by comptr.rank_points desc
            limit 3";
    return $db->fetch($sql, outputModel:ImageModel::class);
  }

  public static function fetchNameByUserId($userId){
    $db = new DbConnection();
    $sql = "SELECT file_name
              from images
            where user_id = :user_id";
    return $db->fetch($sql, [':user_id'=>$userId], fetchOne:true);
  }

  public static function fetchHigherRankThan($rankPoints){
    $db = new DbConnection();
    $sql = "SELECT img.file_name, u.user_name, comptr.rank_points
            from users as u
              inner join images as img
                on u.id = img.user_id
              inner join competitors as comptr
                on u.id = comptr.user_id
            where comptr.rank_points > :rank_points + 50
            limit 5";
    return $db->fetch($sql, ['rank_points'=>$rankPoints], ImageWithRP::class);
  }
}
