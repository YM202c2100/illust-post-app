<?php
namespace index\post;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../db/images.query.php";
require_once __DIR__."/../db/contests.query.php";
require_once __DIR__."/../models/post.model.php";

use DateTime;
use db\ContestsQuery;
use db\ImagesQuery;
use libs\Session;
use models\PostModel;

if($_SERVER['REQUEST_METHOD'] === 'GET'){
  ContestsQuery::$targetId = ContestsQuery::fetchCurrentContestId();
  if(isWithinApplicationPeriod()){
    echo json_encode(['error'=>'現在作品応募期間外です']);
    exit();
  }

  \libs\require_session();
  
  $postResModel = new PostModel();

  $user = Session::getUser();
  if(empty($user)){
    $postResModel->isLogin = false;
    $postResModel->returnJson();
  }

  if(isset(ContestsQuery::$targetId)){
    $postResModel->submittedImage = ImagesQuery::fetchNameByUserId($user->id);
  }

  $postResModel->returnJson();
}

if($_SERVER['REQUEST_METHOD'] === 'POST'){
  $image = $_FILES['image_uploads'] ?? null;
  if(!isset($image)){
    http_response_code(500);
    echo json_encode(['status'=>'error', 'body'=>'投稿失敗']);
    exit();
  }

  \libs\require_session();

  $user = Session::getUser();
  if(empty($user)){
    echo json_encode(['status'=>'error', 'body'=>'投稿失敗-ログインしてください']);
    exit();
  }

  ContestsQuery::setCurrentContestId();
  
  $isSuccess = ImagesQuery::uploadImage($image['name'], $user->id);
  if(!$isSuccess){
    http_response_code(500);
    echo json_encode(['status'=>'error', 'body'=>'投稿失敗']);
  }

  Session::setIsSubmitted(true);
  
  // move_uploaded_file($image['tmp_name'], '../../public/'. $image['name']);
  echo json_encode(['status'=>'ok', 'body'=>"投稿成功"]);
  
}


function isWithinApplicationPeriod(){
  if(empty(ContestsQuery::$targetId)){
    return false;
  }

  $contestInfo = ContestsQuery::fetchContestInfo(ContestsQuery::$targetId);

  $currentDate = new DateTime();
  $startDate = new DateTime($contestInfo->application_start_date);
  $endDate = new DateTime($contestInfo->application_end_date);

  return ($startDate <= $currentDate && $currentDate < $endDate);
}