<?php
namespace index\login;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/validate.php";
require_once __DIR__."/../db/users.query.php";
require_once __DIR__."/../db/competitors.query.php";
require_once __DIR__."/../models/user.model.php";
require_once __DIR__."/../models/competitor.model.php";

use db\CompetitorsQuery;
use db\UsersQuery;
use models\CompetitorModel;
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
    
    if($user->pwd === $pwd){
      UserModel::setSession($user);

      $isSubmitted = CompetitorsQuery::getSubmitted($user->id);
      CompetitorModel::setSubmittedSession($isSubmitted);

      echo json_encode(['status'=>'ok', 'body'=>"{$user->user_name}でログインしました"]);
    }else{
      echo json_encode(['status'=>'error', 'body'=>'パスワードが間違っています。']);
      exit();
    }
}