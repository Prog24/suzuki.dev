---
title: CentOS7にknowledgeインストール
date: "2018-02-18T10:00:00.000Z"
template: "post"
draft: false
slug: "CentOS7-knowledge-install"
category: "Web勉強"
tags:
  - "ConoHa"
  - "knowledge"
description: "CentOS7にknowledgeインストール"
---

CentOS7にTomcat8 + knowledgeのセットアップ  
今回は[knowledge](https://github.com/support-project/knowledge/)をCentOS7にセットアップする。knowledgeにはTomcatが動く環境が必要になるのでこれも一緒にセットアップする。

## Java8インストール
```bash
>>> curl -LO -H "Cookie: oraclelicense=accept-securebackup-cookie" \
"http://download.oracle.com/otn-pub/java/jdk/8u162-b12/0da788060d494f5095bf8624735fa2f1/jdk-8u162-linux-x64.rpm"
>>> rpm -Uvh jdk-8u162-linux-x64.rpm
>>> vim /etc/profile
# 下記を追記してパスを通す
export JAVA_HOME=/usr/java/default
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/jre/lib:$JAVA_HOME/lib:$JAVA_HOME/lib/tools.jar
source /etc/profile
```

## Tomcatのセットアップ
```bash
>>> curl -O http://ftp.jaist.ac.jp/pub/apache/tomcat/tomcat-8/v8.5.28/bin/apache-tomcat-8.5.28.tar.gz
>>> tar zxvf apache-tomcat-8.5.28.tar.gz
>>> mv apache-tomcat-8.5.28 /usr/libexec/tomcat8
>>> useradd -M -d /usr/libexec/tomcat8 tomcat
>>> chown -R tomcat. /usr/libexec/tomcat8
>>> vim /usr/lib/systemd/system/tomcat8.service
```

```text
[Unit]
Description=Apache Tomcat 8
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/libexec/tomcat8/bin/startup.sh
ExecStop=/usr/libexec/tomcat8/bin/shutdown.sh
RemainAfterExit=yes
User=tomcat
Group=tomcat

[Install]
WantedBy=multi-user.target
```

```bash
>>> systemctl start tomcat8
>>> systemctl enable tomcat8
```

## firewalldの設定
Tomcatは8080ポートで動くので8080ポートでアクセスができるようにする。
```bash
>>> firewall-cmd --zone=public --add-port=8080/tcp --permanent
>>> firewall-cmd --reload
```

## knowledgeのセットアップ
Tomcatのwebappsフォルダにknowledgeのwarファイルを設置する。
```bash
>>> cd /usr/libexec/tomcat8/webapps
>>> wget https://github.com/support-project/knowledge/releases/download/v1.12.0/knowledge.war
```

## Apacheとの連携
Apacheと連携することでドメインに「:8080」を書かなくてもアクセスできるようにする。
```bash
>>> vim /etc/httpd/conf.d/proxy-ajp.conf
```

```text
<Location /knowledge >
  ProxyPass ajp://localhost:8009/knowledge
  Order allow,deny
  Allow from all
</Location>
```

```bash
>>> vim /usr/libexec/tomcat8/conf/server.xml
```
以下のようにコメントアウトする
```text
<!--
<Connector port="8080" protocol="HTTP/1.1"
  connectionTimeout="20000"
  redirectPort="8443" />
-->
```

## 最後にApacheとTomcatの再起動
最後にApacheとTomcatを再起動して完了
