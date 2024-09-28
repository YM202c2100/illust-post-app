<?php
namespace index\judge;

require_once "../libs/header.php";
require_once "../models/user.model.php";
require_once "../db/images.query.php";

use db\ImagesQuery;
use models\UserModel;

if($_SERVER['REQUEST_METHOD']==="GET"){
  if(isset($_COOKIE["PHPSESSID"])){
    session_start();
  }
  
  $user = UserModel::getFromSession();
  if(empty($user)){
    echo json_encode(['status'=>'error', 'body'=>'ログインしてください']);
    exit();
  }else if( !($user->submitted) ){
    echo json_encode(['status'=>'error', 'body'=>'自分の作品を提出してください']);
    exit();
  }
  
  // ユーザーが作品を提出済みなら、二つの画像を返す
  $images = ImagesQuery::fetchImagesToJudge($user->rank_points);
  if(count($images) !== 2){
    echo json_encode(['status'=>'error', 'body'=>'レコード不足']);
    exit();
  }

  echo json_encode(['status'=>'ok', 'body'=>$images]);
}