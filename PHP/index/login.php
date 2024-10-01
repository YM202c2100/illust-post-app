<?php
namespace index\login;

require_once "../libs/header.php";
require_once "../libs/validate.php";
require_once "../db/users.query.php";
require_once "../db/participants_info.query.php";
require_once "../models/user.model.php";
require_once "../models/participant_info.model.php";

use db\ParticipantsQuery;
use db\UsersQuery;
use models\ParticipantModel;
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

      $isSubmitted = ParticipantsQuery::getSubmitted($user->id);
      ParticipantModel::setSubmittedSession($isSubmitted);

      echo json_encode(['status'=>'ok', 'body'=>"{$user->user_name}でログインしました"]);
    }else{
      echo json_encode(['status'=>'error', 'body'=>'パスワードが間違っています。']);
      exit();
    }
}