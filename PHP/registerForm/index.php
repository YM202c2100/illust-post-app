<?php
namespace registerForm;
header('Content-Type: application/json');


if($_SERVER['REQUEST_METHOD'] === "POST"){
  $id = $_POST['id'] ?? null;
  $pwd = $_POST['pwd'] ?? null;
  $userName = $_POST['userName'] ?? null;

  echo json_encode([
    'id'=>$id,
    'pwd'=>$pwd,
    'userName'=>$userName
  ]);
}