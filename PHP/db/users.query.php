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
}
