<?php
namespace index\post;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../db/images.query.php";
require_once __DIR__."/../models/storingModel/user.model.php";
require_once __DIR__."/../models/storingModel/competitor.model.php";

use db\ImagesQuery;
use models\CompetitorModel;
use models\UserModel;

session_start();


if($_SERVER['REQUEST_METHOD'] === 'POST'){
  $image = $_FILES['image_uploads'] ?? null;
  if(!isset($image)){
    http_response_code(500);
    echo json_encode(['status'=>'error', 'body'=>'投稿失敗']);
    exit();
  }
  
  $user = UserModel::getFromSession();
  if(empty($user)){
    echo json_encode(['status'=>'error', 'body'=>'投稿失敗-ログインしてください']);
    exit();
  }

    $isSuccess = ImagesQuery::uploadImage($image['name'], $user->id);
  if(!$isSuccess){
    http_response_code(500);
    echo json_encode(['status'=>'error', 'body'=>'投稿失敗']);
  }

  CompetitorModel::setSubmittedSession(true);
  
  // move_uploaded_file($image['tmp_name'], '../../public/'. $image['name']);
  echo json_encode(['status'=>'ok', 'body'=>"投稿成功"]);
  
}