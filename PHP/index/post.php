<?php
namespace index\post;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../db/images.query.php";
require_once __DIR__."/../models/responseModel/post.model.php";

use db\ImagesQuery;
use libs\Session;
use models\PostModel;

if($_SERVER['REQUEST_METHOD'] === 'GET'){
  \libs\require_session();
  
  $postModel = new PostModel();

  $user = Session::getUser();
  if(empty($user)){
    $postModel->isLogin = false;
    $postModel->returnJson();
  }

  $postModel->submittedImage = ImagesQuery::fetchNameByUserId($user->id);

  $postModel->returnJson();
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

    $isSuccess = ImagesQuery::uploadImage($image['name'], $user->id);
  if(!$isSuccess){
    http_response_code(500);
    echo json_encode(['status'=>'error', 'body'=>'投稿失敗']);
  }

  Session::setIsSubmitted(true);
  
  // move_uploaded_file($image['tmp_name'], '../../public/'. $image['name']);
  echo json_encode(['status'=>'ok', 'body'=>"投稿成功"]);
  
}