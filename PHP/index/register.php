<?php
namespace index\register;
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

session_start();

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
    UserModel::setSession($user);
    echo json_encode(['status'=>'ok', 'body'=>$user]);
  }
}