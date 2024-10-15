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

try{
  if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $postResModel = new PostModel();

    ContestsQuery::$targetId = ContestsQuery::fetchCurrentContestId();
    if(!isWithinApplicationPeriod()){
      $postResModel->isWithinPeriod = false;
      $postResModel->returnJson();
    }

    \libs\require_session();

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
      throw new \Exception("投稿に失敗しました");
    }

    \libs\require_session();

    $user = Session::getUser();
    if(empty($user)){
      throw new \Exception("投稿に失敗しました。ログインしてください");
      
    }

    ContestsQuery::$targetId = ContestsQuery::fetchCurrentContestId();
    
    $isSuccess = ImagesQuery::uploadImage($image['name'], $user->id);
    if(!$isSuccess){
      throw new \Exception("投稿に失敗しました");
    }

    Session::setIsSubmitted(true);
    
    // move_uploaded_file($image['tmp_name'], '../../public/'. $image['name']);
    echo json_encode([]);
  }
}catch (\Throwable $th){
  http_response_code(500);
  echo json_encode(['errMsg'=>$th->getMessage()]);
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