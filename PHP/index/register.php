<?php
namespace index\register;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../models/storingModel/user.model.php";
require_once __DIR__."/../db/users.query.php";
use db\UsersQuery;
use models\UserModel;

session_start();

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