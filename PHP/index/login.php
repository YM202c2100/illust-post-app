<?php
namespace index\login;

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

require_once "../models/userModel.php";
require_once "../db/users.query.php";
require_once "../db/dbConnection.php";
require_once "../libs/validate.php";

use db\UsersQuery;
use models\UserModel;


session_start();

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $id = $_POST['id'] ?? null;
    $pwd = $_POST['pwd'] ?? null;

    $errors = UserModel::getValidationErrors([
      'id' => $id,
      'pwd' => $pwd
    ]);

    if(isset($errors)){
      echo json_encode(['status'=>'error', 'body'=>$errors]);
      exit();
    }

    $user = UsersQuery::fetchById($id);
    if(empty($user)){
      echo json_encode(['status'=>'error', 'body'=>'ユーザーが見つかりませんでした。']);
      exit();
    }
    
    if($user['pwd'] === $pwd){
      $userModel = new UserModel($user['id'], $user['pwd'], $user['userName']);
      UserModel::setSession($userModel);
      echo json_encode(['status'=>'ok', 'body'=>"{$userModel->userName}でログインしました"]);
    }else{
      echo json_encode(['status'=>'error', 'body'=>'パスワードが間違っています。']);
      exit();
    }
}