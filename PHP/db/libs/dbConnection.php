<?php
namespace db;

use PDO;

class SingleTonPDO {
  private static $conn;

  public static function getInstance($dsn, $username, $password){
    if(!isset(self::$conn)){
      self::$conn = new PDO($dsn, $username, $password);
    }
    return self::$conn;
  }
}

class DbConnection {
  private PDO $conn;
  public function __construct(
    $host='localhost', $port='8889', $dbname='illust_post', 
    $username='test_user', $password='pwd') 
  {
    $dsn = "mysql:host={$host};port={$port};dbname={$dbname}";
    $this->conn = SingleTonPDO::getInstance($dsn, $username, $password);
  }

  // 単品では値を取得しないDB操作で使用
  public function execute($sql, $values=[], $questionPlaceHolder=false, $returnBoolean=true){
    $pstmt = $this->conn->prepare($sql);

    if($questionPlaceHolder){ // 疑問符プレースホルダーの場合
      $isSuccess = $pstmt->execute($values);
    }else{ // 名前付きプレースホルダーの場合
      DbConnection::bindValues($pstmt, $values);
      $isSuccess = $pstmt->execute();
    }

    if($returnBoolean){
      return $isSuccess;
    }else{
      return $pstmt;
    }
  }

  public static function bindValues($preparedStmt, $valueMap){
    foreach($valueMap as $placeHolder => $value){
      $preparedStmt->bindValue($placeHolder, $value);
    }
  }

  public function fetch($sql, $values=[], $outputModel=null, $questionPlaceHolder=false, $fetchKeyPair=false, $fetchOne=false){
    $excutedStmt = $this->execute($sql, $values, $questionPlaceHolder, returnBoolean:false);
    
    //　出力形式を指定
    if($outputModel){
      $records = $excutedStmt->fetchAll(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, $outputModel);
    }else if($fetchKeyPair){
      $records = $excutedStmt->fetchAll(PDO::FETCH_KEY_PAIR);
    }else{
      $records = $excutedStmt->fetchAll(PDO::FETCH_COLUMN);
    }

    if(empty($records)){
      return $records;
    }

    if($fetchOne){
      return $records[0];
    }else{
      return $records;
    }
  }
}