---
title: Let’s EncryptでSSL設定
date: "2018-02-18T10:00:00.000Z"
template: "post"
draft: false
slug: "LetsEncrypt-SSL"
category: "Web勉強"
tags:
  - "ConoHa"
  - "Let’s Encrypt"
  - "SSL"
description: "Let’s EncryptでSSL設定"
---

[これ](/posts/ConoHaでサブドメインを使う)で書いたApacheをLet’s Encryptを使用してSSLに対応させた。

## 必要なツールのダウンロード
今回は「[cerbot](https://github.com/certbot/certbot.git)」を使用するのでgitを使用してダンロードする。
```bash
git clone https://github.com/certbot/certbot.git
```

## ファイアウォールの設定
現状はhttpsでのアクセスができなくなっているのでアクセスできるように設定する。

```bash
sudo firewall-cmd --add-service=https --zone=public --permanent
sudo firewall-cmd --reload
```

## SSLの設定
最初にダウロードしたcerbotを使用して設定する。
```bash
./certbot-auto certonly --non-interactive --agree-tos --webroot -w [ドキュメントルート] -d [ドメイン] --email [メールアドレス]
```

## Apacheで証明書の設定
```bash
vim /etc/httpd/conf.d/ssl.conf
```
下記の2行部分を修正した。
```text
SSLCertificateFile /etc/letsencrypt/live/[ドメイン]/cert.pem
SSLCertificateKeyFile /etc/letsencrypt/live/[ドメイン]/privkey.pem
```

## HTTPからHTTPSへのリダイレクト設定
```text
<IfModule rewrite_module>
    RewriteEngine On
    LogLevel alert rewrite:trace3
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R,L]
</IfModule>
```

## Apacheの再起動
最後にApacheを再起動したら完了
```bash
sudo service httpd restart
```
