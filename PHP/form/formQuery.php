<?php

class FormQuery {
  private $conn;
  public function __construct() {
    $dsn = "mysql:host=localhost;port=8889;dbname=illust_post";
    $this->conn = new PDO($dsn, 'test_user', 'pwd');
  }

  public function insert($fileName):bool{
    $sql = 'INSERT into test_images (file_name) values (:file_name)';
    $pst = $this->conn->prepare($sql);
    $pst->bindValue(':file_name', $fileName);
    $isSuccess = $pst->execute();
    return $isSuccess;
  }
}
