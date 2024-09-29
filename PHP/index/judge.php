<?php
namespace index\judge;

require_once "../libs/header.php";
require_once "../models/user.model.php";
require_once "../models/participant_info.model.php";
require_once "../db/participants_info.query.php";
require_once "../db/images.query.php";

use db\ImagesQuery;
use db\ParticipantsQuery;
use models\ParticipantModel;
use models\UserModel;

if($_SERVER['REQUEST_METHOD']==="GET"){
  if(isset($_COOKIE["PHPSESSID"])){
    session_start();
  }
  
  $user = UserModel::getFromSession();
  if(empty($user)){
    echo json_encode(['status'=>'error', 'body'=>'ログインしてください']);
    exit();
  }
  
  if( !ParticipantModel::isSubmitted() ){
    echo json_encode(['status'=>'error', 'body'=>'自分の作品を提出してください']);
    exit();
  }
  
  // ユーザーが作品を提出済みなら、二つの画像を返す
  $rankPointsOfEvalator = ParticipantsQuery::getRankPointsOf($user);
  $images = ImagesQuery::fetchImagesToJudge($rankPointsOfEvalator);
  if(count($images) !== 2){
    echo json_encode(['status'=>'error', 'body'=>'レコード不足']);
    exit();
  }

  echo json_encode(['status'=>'ok', 'body'=>$images]);
}