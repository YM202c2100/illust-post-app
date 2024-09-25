<?php
namespace index\imageForm;

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

require_once '../db/images.query.php';
require_once '../db/dbConnection.php';
require_once '../models/userModel.php';
use db\ImagesQuery;
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
  if($isSuccess){
    // move_uploaded_file($image['tmp_name'], '../../public/'. $image['name']);
    echo json_encode(['status'=>'ok', 'body'=>"投稿成功"]);
  }else{
    http_response_code(500);
    echo json_encode(['status'=>'error', 'body'=>'投稿失敗']);
  }
}