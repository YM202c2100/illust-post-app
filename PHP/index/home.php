<?php
namespace index\home;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../models/home.model.php";
require_once __DIR__."/../db/images.query.php";
require_once __DIR__."/../db/contests.query.php";

use db\ContestsQuery;
use db\ImagesQuery;
use libs\Session;
use models\HomeModel;

if($_SERVER['REQUEST_METHOD'] === "GET"){
  try {
    $homeModel = new HomeModel();
    \libs\require_session();
  
    $user = Session::getUser();
    if(empty($user)){
      $homeModel->isLogin = false;
      $homeModel->returnJson();
      exit();
    }

    ContestsQuery::setCurrentContestId();
    if(isset(ContestsQuery::$currentId)){
      $homeModel->submittedFileName = ImagesQuery::fetchNameByUserId($user->id);
    }else{
      $homeModel->isCurrentlyHeld = false;
      ContestsQuery::setNextScheduledId();
    }
    
    $contestData = ContestsQuery::fetchContestInfo();
    $homeModel->contest = $contestData->createContestResponse();

    $homeModel->returnJson();

  } catch (\Throwable $th) {
    echo json_encode(['status'=>'error', 'body'=>$th->getMessage()]);
    exit();
  }
}