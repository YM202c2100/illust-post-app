<?php
namespace db;

require_once "../db/dbConnection.php";

class ParticipantsQuery {
  public static function updateSubmittedStatus($userId):bool{
    $db = new DbConnection();

    $sql = "UPDATE participants_info set submitted = true where user_id=:user_id";
    $isSuccess = $db->execute($sql, [':user_id'=>$userId]);

    if($isSuccess){
      $_SESSION['submitted'] = true;
    }
    
    return $isSuccess;
  }
}