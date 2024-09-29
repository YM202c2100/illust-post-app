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
    $sql = "SELECT img.id, img.file_name 
            from images as img 
            inner join participants_info as p_info 
              on img.user_id = p_info.user_id
            where p_info.rank_points > :rankPointsOfEvalator
            order by p_info.judged_count asc,
              p_info.rank_points asc 
            limit 2";

    return $db->select($sql, [':rankPointsOfEvalator'=>$rankPointsOfEvalator], ImageModel::class);
  }
}
