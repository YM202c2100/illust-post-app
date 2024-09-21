<?php
namespace index\register;
header('Content-Type: application/json');

require_once "../models/userModel.php";
require_once "../db/users.query.php";
require_once "../db/dbConnection.php";

use db\UsersQuery;
use models\UserModel;

if($_SERVER['REQUEST_METHOD'] === "POST"){
  $id = $_POST['id'] ?? null;
  $pwd = $_POST['pwd'] ?? null;
  $userName = $_POST['userName'] ?? null;

  if(!isset($id, $pwd, $userName)) {
    echo json_encode(['status'=>'error', 'body'=>'必要な情報を入力してください']);
    exit();
  };

  // すでに同じIDのユーザーが存在するかどうか
  $userRecord = UsersQuery::fetchById($id);
  if(!empty($userRecord)){
    echo json_encode(['status'=>'error', 'body'=>'既にユーザーが存在している']);
    exit();
  }

  $user = new UserModel($id, $pwd, $userName);

  // dbにユーザー情報を格納
  if(UsersQuery::registUser($user)){
    echo json_encode([
      'id'=>$id,
      'pwd'=>$pwd,
      'userName'=>$userName
    ]);
  }
}