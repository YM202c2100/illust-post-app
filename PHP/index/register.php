<?php
namespace index\register;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../libs/errorMessage.php";
require_once __DIR__."/../models/user.model.php";
require_once __DIR__."/../db/users.query.php";
use db\UsersQuery;
use libs\Session;
use models\UserModel;

try{
  session_start();

  if($_SERVER['REQUEST_METHOD'] === "POST"){
    $id = $_POST['id'] ?? null;
    $pwd = $_POST['pwd'] ?? null;
    $userName = $_POST['userName'] ?? null;

    // バリデーションチェック
    $errors = UserModel::getValidationErrors(['id'=>$id, 'pwd'=>$pwd, 'userName'=>$userName]);
    if(isset($errors)){
      \libs\returnErrorMessage('入力が正しくありません');
    }

    // すでに同じIDのユーザーが存在するかどうか
    $user = UsersQuery::fetchById($id);
    if(!empty($user)){
      \libs\returnErrorMessage('既にユーザーが存在しています');
    }

    $user = new UserModel($id, $pwd, $userName);

    // dbにユーザー情報を格納
    if(UsersQuery::registUser($user)){
      Session::setUser($user);
    }

    \libs\returnErrorMessage(null);
  }
}catch(\Throwable $th){
  http_response_code(500);
  \libs\returnErrorMessage('予期せぬエラーが発生しました');
}