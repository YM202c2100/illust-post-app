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

  public function bindExecute($sql, $valueMap, $returnObject=false){
    $preparedStmt = $this->conn->prepare($sql);
    if(isset($valueMap)){
      DbConnection::bindValues($preparedStmt, $valueMap);
    }
    $isSuccess = $preparedStmt->execute();
    
    if($returnObject){
      return $preparedStmt;
    }else{
      return $isSuccess;
    }
  }

  // 一つだけ取得した場合->配列内の一つ目の'要素'を返す
  // 複数取得した場合->取得した全てのレコードの'配列'を返す
  // なにも取得できなかった場合->空の'配列'を返す
  public function select($sql, $valueMap, $class){
    $executedStmt = $this->bindExecute($sql, $valueMap, true);
    $records = $executedStmt->fetchAll(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, $class);
    
    if(count($records)===1){
      return $records[0];
    }else{
      return $records;
    }
  }

  public function fetchAllInArray($sql, $valArray, $class){
    $stmt = $this->conn->prepare($sql);
    $stmt->execute($valArray);
    return $stmt->fetchAll(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, $class);
  }

  public static function bindValues($preparedStmt, $valueMap){
    foreach($valueMap as $placeHolder => $value){
      $preparedStmt->bindValue($placeHolder, $value);
    }
  }

}