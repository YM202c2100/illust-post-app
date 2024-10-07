<?php
namespace libs;

function require_session(){
  if(isset($_COOKIE["PHPSESSID"])){
    session_start();
  }
}

class Session{
  private const IS_SUBMITTED = 'isSubmitted';

  public static function isSubmitted():bool{
    $isSubmitted = $_SESSION[Session::IS_SUBMITTED] ?? null;
    return (bool)$isSubmitted;
  }
  
  public static function setIsSubmitted($boolean){
    $_SESSION[Session::IS_SUBMITTED] = $boolean;
  }
}