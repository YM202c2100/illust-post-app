<?php
namespace db;

use models\UserModel;

class UsersQuery{
  public static function registUser(UserModel $user):bool{
    try {
      $db = new DbConnection();

      $sql = 'INSERT into users (id, pwd, userName) values (:id, :pwd, :userName)';
      $valueMap = [
        ':id' => $user->id,
        ':pwd' => $user->pwd,
        ':userName' => $user->userName
      ];

      return $db->execute($sql, $valueMap);

    } catch (\Throwable $th) {
      throw $th->getMessage();
    }
  }

  public static function fetchById($id){
    $db = new DbConnection();
    
    $sql = "SELECT * from users where id=:id";
    $records = $db->select($sql, [':id'=>$id]);
    
    return $records;
  }
}
