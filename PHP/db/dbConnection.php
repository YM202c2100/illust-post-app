<?php
namespace db;

use PDO;

class SingleTonPDO {
  private static $conn;

  public static function getInstance($dsn, $username, $password){
    if(!isset(self::$conn)){
      self::$conn = new PDO($dsn, $username, $password);
      self::$conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }
    return self::$conn;
  }
}

class DbConnection {
  private $conn;
  public function __construct(
    $host='localhost', $port='8889', $dbname='illust_post', 
    $username='test_user', $password='pwd') 
  {
    $dsn = "mysql:host={$host};port={$port};dbname={$dbname}";
    $this->conn = SingleTonPDO::getInstance($dsn, $username, $password);
  }

  public function execute($sql, $valueMap, $returnObject=false){
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

  public function select($sql, $valueMap){
    $executedStmt = $this->execute($sql, $valueMap, true);
    $records = $executedStmt->fetchAll();
    
    if(count($records)===1){
      return $records[0];
    }else{
      return $records;
    }
  }

  public static function bindValues($preparedStmt, $valueMap){
    foreach($valueMap as $placeHolder => $value){
      $preparedStmt->bindValue($placeHolder, $value);
    }
  }

}