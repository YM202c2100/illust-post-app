<?php
namespace db;

require_once "../db/dbConnection.php";
require_once "../models/user.model.php";

use models\UserModel;

class UsersQuery{
  public static function registUser(UserModel $user):bool{
    try {
      $db = new DbConnection();

      $sql = 'INSERT into users (id, pwd, user_name) values (:id, :pwd, :user_name)';
      $valueMap = [
        ':id' => $user->id,
        ':pwd' => $user->pwd,
        ':user_name' => $user->user_name
      ];

      return $db->bindExecute($sql, $valueMap);

    } catch (\Throwable $th) {
      throw $th->getMessage();
    }
  }

  public static function fetchById($id){
    $db = new DbConnection();
    
    $sql = "SELECT * from users where id=:id";
    $user = $db->select($sql, [':id'=>$id], UserModel::class);
    
    return $user;
  }
}
