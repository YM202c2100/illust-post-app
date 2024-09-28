<?php
namespace index\register;
require_once "../libs/header.php";

session_start();

require_once "../models/user.model.php";
require_once "../db/users.query.php";
require_once "../db/dbConnection.php";
require_once "../libs/validate.php";

use db\UsersQuery;
use models\UserModel;

if($_SERVER['REQUEST_METHOD'] === "POST"){
  $id = $_POST['id'] ?? null;
  $pwd = $_POST['pwd'] ?? null;
  $userName = $_POST['userName'] ?? null;

  // バリデーションチェック
  $errors = UserModel::getValidationErrors(['id'=>$id, 'pwd'=>$pwd, 'userName'=>$userName]);
  if(isset($errors)){
    echo json_encode(['status'=>'error', 'body'=>$errors]);
    exit();
  }

  // すでに同じIDのユーザーが存在するかどうか
  $user = UsersQuery::fetchById($id);
  if(!empty($user)){
    echo json_encode(['status'=>'error', 'body'=>'既にユーザーが存在している']);
    exit();
  }

  $user = new UserModel($id, $pwd, $userName);

  // dbにユーザー情報を格納
  if(UsersQuery::registUser($user)){
    UserModel::setSession($user);
    echo json_encode(['status'=>'ok', 'body'=>$user]);
  }
}