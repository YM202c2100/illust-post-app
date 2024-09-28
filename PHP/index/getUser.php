<?php
// ログイン中なら、ユーザー情報を返し
// そうでないなら、空の配列を返す
namespace index\getUser;

require_once "../libs/header.php";

if(empty($_COOKIE['PHPSESSID'])){
  echo json_encode([]);
  exit();
}

session_start();
$user = $_SESSION['user'];
if(empty($user)){
  echo json_encode([]);
  exit();
}

echo json_encode($user);