<?php
namespace index\post;

require_once "../libs/header.php";
require_once '../db/images.query.php';
require_once '../db/competitors.query.php';
require_once '../models/user.model.php';
require_once '../models/competitor.model.php';

use db\ImagesQuery;
use db\CompetitorsQuery;
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

  $isSuccess = ImagesQuery::insert($image['name'], $user->id);

  if(!$isSuccess){
    http_response_code(500);
    echo json_encode(['status'=>'error', 'body'=>'投稿失敗']);
  }

  $isSuccess = CompetitorsQuery::updateSubmittedStatus($user->id);
  if(!$isSuccess){
    http_response_code(500);
    echo json_encode(['status'=>'error', 'body'=>'投稿失敗']);
  }
  CompetitorModel::setSubmittedSession(true);
  
  // move_uploaded_file($image['tmp_name'], '../../public/'. $image['name']);
  echo json_encode(['status'=>'ok', 'body'=>"投稿成功"]);
  
}