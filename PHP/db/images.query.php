<?php
namespace db;

require_once "../db/dbConnection.php";
require_once "../models/image.model.php";

use modles\ImageModel;

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

  public static function fetchNameByUserId($userId):ImageModel{
    $db = new DbConnection();
    $sql = "SELECT file_name
              from images
            where user_id = :user_id";
    return $db->fetch($sql, [':user_id'=>$userId], ImageModel::class, fetchOne:true);
  }
}
