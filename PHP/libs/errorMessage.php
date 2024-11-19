<?php
namespace libs;

function returnErrorMessage($errMsg){
  echo json_encode(['errMsg'=>$errMsg]);
  exit();
}