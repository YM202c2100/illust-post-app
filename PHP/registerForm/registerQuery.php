<?php
namespace registerForm;

require_once "/MAMP/htdocs/illust-post-app/PHP/libs/dbConnection.php";
use libs\DbConnection;
use models\UserModel;

class RegisterQuery{
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
      throw $th;
    }
  }
}
