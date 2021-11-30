---
title: Google HomeでConoHaの料金確認
date: "2017-12-18T10:00:00.000Z"
template: "post"
draft: false
slug: "GoogleHome-ConoHa"
category: "アドベントカレンダー"
tags:
  - "API"
  - "ConoHa"
  - "PHP"
description: "Google HomeでConoHaの料金確認"
---

これは[ConoHa Advent Calendar 2017](https://qiita.com/advent-calendar/2017/conoha) 18日目の記事です。
## 今回作ったもの
Google Homeでこのはちゃんへの貢ぎ度サーバ代金を確認するアプリです。  
Google Homeに「料金教えて」と聞くとConoHaのサーバ料金を教えてくれるというものです。  
今回は取り敢えずで作ったものなので完全個人向けで1つのアカウントのみに対応します。

## 作り方（手順）
- ConoHaのAPIを叩いて今月のサーバ代金をjson形式で返すプログラムの作成
- 作成したプログラムを適当なサーバに転がす
- Action on Googleとdialogflowの設定

## ConoHaのAPIを叩いて今月のサーバ代金をjson形式で返すプログラムの作成
ConoHaのAPIを叩く処理は[1週間ほど前に行った](/posts/ConoHaのAPIに触れてみた)ので同じ感じに行った。  

しかし、今回はjsonで返さないといけないので少しだけ修正。  
修正後のコードはこんな感じになりました。ConoHaのAPI用のユーザ名などの情報は直書きしてしまっています。。多分よくないよね。。

**※{“speach”, “話させる内容”} こういう形で返さないといけないということを知らなくて結構時間かけてしまいました。**

```php
<?php
$username = "ユーザ名";
$password = "パスワード";
$tenantId = "テナントID";
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
	$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($req_data));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $res_json =  curl_exec($ch);
    $res_data = json_decode($res_json);
    curl_close($ch);
    return $res_data;
}
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
function makeJson($data)
{
	return json_encode($data);
}
$tokens = getToken($username, $password, $tenantId);
$token = $tokens->access->token->id;
$data = getPayList($token, $tenantId);
$array = json_decode($data);
$pay = $array->billing_invoices[0]->bill_plus_tax;
$say_content = array(
	'speech' => $pay . "円です"
);
echo makeJson($say_content);
```

上記のコードを叩くとConoHaの料金を  
{“speech”:”○○円です”} という形で返してくれるというものになります。  
コードにユーザIDなどを直書きしているので他人に叩かれたら色々バレるので気をつけましょう。

## 作成したプログラムを適当なサーバに転がす
今回は先ほど作成したプログラムを叩いて返ってきた内容をそのまま話させるというものなのでどこかサーバに置かなきゃなぁ。。となりました。  
まあ、このはちゃんに置いたらいいのかなとも思いましたが、このためにこのはちゃんに貢ぐのもアレなので別で契約しているサーバに起きました。

## Action on Googleとdialogflowの設定
次に、先ほど作成したプログラムをGoogle Homeで叩けるようにする。  

最初に[Action on Googleのコンソール画面](https://console.actions.google.com/)に行く。
![1](/media/GoogleHome-ConoHa/conoha-advent1.png)

「Add/import Project」をクリックしてプロジェクトの追加を行う。  
今回はProject nameをConoHa、言語を日本語に設定した。

![2](/media/GoogleHome-ConoHa/conoha-advent2.png)

プロジェクトを作成したらいくつか選択肢が出てくるので今回は「Dialogflow」を選択してアプリを作っていきます。

![3](/media/GoogleHome-ConoHa/conoha-advent3.png)

Dialogflowのページに行ったらアプリ名をConoHa（おそらくデフォルトで設定されているはず）、言語を日本語に設定してCREATEボタンを押します。  
この時、デフォルトの言語は日本語ではなくなっているので変更を忘れないように注意しないといけません。

![4](/media/GoogleHome-ConoHa/conoha-advent4.png)

次に、左メニューの「Fulfillment」をクリックし、webhookの設定を書きます。  
最初に作成したプログラムを置いたURLを指定します。

![5](/media/GoogleHome-ConoHa/conoha-advent6.png)

次に左メニューの「Intents」に行き、ユーザの言葉に対する動作を設定します。  
今回は「料金教えて」と話されたら、先ほど設定したwebhookで返って来たデータを喋らせる。という動作をさせたいので画像のように設定しました。  
※Fulfillmentの項目でUse webhookを選択したらResponseに何を書いてもwebhookの返答しか返ってこないようでした。

![6](/media/GoogleHome-ConoHa/conoha-advent7.png)

最後に左メニューのIntegrationsでGoogle Assistantと連携させたらDialogflowの設定は完了です。  

IntegrationsのページでGoogle Assistantを選択し、UPDATE DRAFTを押します。

![7](/media/GoogleHome-ConoHa/conoha-advent8.png)

![8](/media/GoogleHome-ConoHa/conoha-advent9.png)

## 完成
これで一応完成です。  
Actions on Googleのコンソールページに戻り、シミュレータで動作確認をします。  
現状、アプリの呼び出し設定ができていないので「テスト用アプリにつないで」という呼び出し方しかできません。  
設定しようとしたのですが、項目が多くてよく分からなかったです。また後でやります。

![9](/media/GoogleHome-ConoHa/conoha-advent12.png)

そして、こんな感じに「料金教えて」と言えば前回支払いのサーバ代金を答えてくれます。  
Google Homeにアカウントを紐付ければ同じように使用することが出来ました。

![10](/media/GoogleHome-ConoHa/conoha-advent13.png)

「1円です」。。。ここ最近ConoHaでサーバを立てていませんでした。。。

## まとめ
今回は「前回までの支払い情報を取得する」APIを使用して一応動作したので、別のAPIも使用してGoogle Home経由でこのはちゃんに色々してもらえるようにしていこうと思います。
