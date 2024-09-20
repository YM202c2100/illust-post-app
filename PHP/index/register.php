<?php
namespace index\register;
header('Content-Type: application/json');

require_once "../models/userModel.php";
require_once "../db/users.query.php";
require_once "../db/dbConnection.php";

use Error;
use db\UsersQuery;
use models\UserModel;

if($_SERVER['REQUEST_METHOD'] === "POST"){
  $id = $_POST['id'] ?? null;
  $pwd = $_POST['pwd'] ?? null;
  $userName = $_POST['userName'] ?? null;

  if(!isset($id, $pwd, $userName)) {
    throw new Error("need form data");
  };

  $user = new UserModel($id, $pwd, $userName);

  // dbにユーザー情報を格納
  if(UsersQuery::registUser($user)){
    echo json_encode([
      'id'=>$id,
      'pwd'=>$pwd,
      'userName'=>$userName
    ]);
  }
}