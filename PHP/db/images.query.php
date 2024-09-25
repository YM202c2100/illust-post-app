<?php
namespace db;

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
}
