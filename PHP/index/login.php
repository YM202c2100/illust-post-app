<?php
namespace index\login;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../libs/validate.php";
require_once __DIR__."/../libs/errorMessage.php";
require_once __DIR__."/../db/users.query.php";
require_once __DIR__."/../db/contests.query.php";
require_once __DIR__."/../db/competitors.query.php";
require_once __DIR__."/../models/user.model.php";

use db\CompetitorsQuery;
use db\ContestsQuery;
use db\UsersQuery;
use libs\Session;
use models\UserModel;

try{
  session_start();

  if($_SERVER['REQUEST_METHOD'] === "POST"){
      $id = $_POST['id'] ?? null;
      $pwd = $_POST['pwd'] ?? null;

      $errors = UserModel::getValidationErrors([
        'id' => $id,
        'pwd' => $pwd
      ]);

      if(isset($errors)){
        \libs\returnErrorMessage('入力が正しくありません');
      }

      $user = UsersQuery::fetchById($id);
      if(empty($user)){
        \libs\returnErrorMessage('ユーザーが見つかりませんでした');
      }
      
      if($user->pwd !== $pwd){
        \libs\returnErrorMessage('パスワードが間違っています');
      }
      Session::setUser($user);
      
      ContestsQuery::$targetId = ContestsQuery::fetchCurrentContestId();
      $isSubmitted = CompetitorsQuery::fetchIsSubmitted($user->id);
      Session::setIsSubmitted($isSubmitted);

      http_response_code(200);
      \libs\returnErrorMessage(null);
    }
  } catch(\Throwable $th){
    http_response_code(500);
    \libs\returnErrorMessage('予期せぬエラーが発生しました');
}