<?php

class FormQuery {
  
  public static function insert($fileName):bool{
    $dsn = "mysql:host=localhost;port=8889;dbname=illust_post";
    $db = new PDO($dsn, 'test_user', 'pwd');
    
    $sql = 'INSERT into test_images (file_name) values (:file_name)';
    $pst = $db->prepare($sql);
    $pst->bindValue(':file_name', $fileName);
    $isSuccess = $pst->execute();
    return $isSuccess;
  }
}
