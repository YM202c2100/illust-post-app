<?php
namespace libs;

function require_session(){
  if(isset($_COOKIE["PHPSESSID"])){
    session_start();
  }
}

