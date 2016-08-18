<?php

$recepient = "l158@mail.ru";
$sitename = "Название сайта";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
// $mes = trim($_POST["comm"]);
// $siteAdress = trim($_POST["siteAdress"]);
// $message = "Имя: $name \nТелефон: $phone";
// $message = "Имя: $name \nТелефон: $phone \nE-mail: $email \nСообщение: $mes \nАдрес сайта: $siteAdress";
if($email == ""){
  $message = "Имя: $name \nТелефон: $phone";
  $pagetitle = "Новая заявка с сайта \"$sitename\"";
  mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
}else{
  $message = "Email: $email";
  $pagetitle = "Новая подписка с сайта \"$sitename\"";
  mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
}