<?php
namespace libs;

function getReqJsonBody():array{
  $reqBody = file_get_contents('php://input');

  return json_decode($reqBody, true);
}