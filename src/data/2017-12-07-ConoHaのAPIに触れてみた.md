---
title: ConoHaのAPIに触れてみた
date: "2017-12-07T10:00:00.000Z"
template: "post"
draft: false
slug: "ConoHa-API"
category: "Web勉強"
tags:
  - "API"
  - "ConoHa"
  - "PHP"
description: "ConoHaのAPIに触れてみた"
---

ConoHaのAPIに触れたいな。とふと思いPHPで触ったのでそれのメモ。。  

まず最初にAPIを使用するためのトークンを取得する必要があるとのことで、トークン発行[公式DOC]を見て下記のコードを作成。  

ユーザ名、パスワード、テナントIDはConoHaのコントロールパネルで確認して変数にした。  

トークン取得
```php
<?php
/**
 * トークン取得
 */
function getToken($username, $password, $tenantId)
{

    $url = "https://identity.tyo1.conoha.io/v2.0/tokens";
    
    $headers = array(
        "Accept: application/json"
    );

    $req_data = array(
        "auth" => array(
            "passwordCredentials" => array(
                "username" => $username,
                "password" => $password
            ),
            "tenantId" => $tenantId
        )
    );

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($req_data));
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    $res_json =  curl_exec($curl);
    $res_data = json_decode($res_json);
    curl_close($curl);
    
    return $res_data;
}
```

今回は取り敢えずとして[請求データ一覧取得-公式DOC](https://www.conoha.jp/docs/account-billing-invoices-list.html)を実装しようと思う。  

トークンとテナントIDを使用して取得した。  

支払い情報一覧取得
```php
<?php
/**
 * 請求データ一覧取得
 */
function getPayList($token, $tenantId)
{
    $url = "https://account.tyo1.conoha.io/v1/{$tenantId}/billing-invoices?limit=3";
    $headers = array(
        "Accept: application/json",
        "X-Auth-Token: {$token}"
    );
    
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    
    return $response;
}
```

上記のコードで取得できるデータは直近3回分の支払い情報なのでjson_decodeで配列に直し、最新のデータから支払い金額だけを取得して表示するようにした。
最新の支払い金額取得
```php
<?php
/**
 * 最新の支払い金額を表示する
*/
// トークン取得
$tokens = getToken($username, $password, $tenantId);
$token  = $tokens->access->token->id;
// 支払い情報一覧取得
$pays   = getPayList($token, $tenantId);
$array  = json_decode($pays);
// 一番最近の支払い金額を表示
print_r($array->billing_invoices[0]->bill_plus_tax);
```
