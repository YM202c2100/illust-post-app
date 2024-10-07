<?php
namespace libs;

require_once __DIR__."/../models/storingModel/user.model.php";
use models\UserModel;

function require_session(){
  if(isset($_COOKIE["PHPSESSID"])){
    session_start();
  }
}

class Session{
  private const USER = 'user';
  private const IS_SUBMITTED = 'isSubmitted';

  public static function isSubmitted():bool{
    $isSubmitted = $_SESSION[Session::IS_SUBMITTED] ?? null;
    return (bool)$isSubmitted;
  }
  
  public static function setIsSubmitted($boolean){
    $_SESSION[Session::IS_SUBMITTED] = $boolean;
  }

  public static function setUser(UserModel $user){
    $_SESSION[Session::USER] = $user;
  }

  public static function getUser(){
    return $_SESSION[Session::USER] ?? null;
  }
}