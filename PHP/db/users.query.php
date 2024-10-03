<?php
namespace db;

require_once __DIR__."/libs/dbConnection.php";
require_once __DIR__."/../models/user.model.php";

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

      return $db->execute($sql, $valueMap);

    } catch (\Throwable $th) {
      throw $th->getMessage();
    }
  }

  public static function fetchById($id){
    $db = new DbConnection();
    
    $sql = "SELECT * from users where id=:id";
    $user = $db->fetch($sql, [':id'=>$id], UserModel::class, fetchOne:true);
    
    return $user;
  }
}
