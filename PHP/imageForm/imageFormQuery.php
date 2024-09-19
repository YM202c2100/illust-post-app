<?php
namespace imageForm;

require_once '../libs/dbConnection.php';
use libs\DbConnection;

class ImageFormQuery {
  public static function insert($fileName):bool{
    $db = new DbConnection();

    $sql = 'INSERT into test_images (file_name) values (:file_name)';
    $isSuccess = $db->execute($sql, [':file_name'=>$fileName]);

    return $isSuccess;
  }
}
