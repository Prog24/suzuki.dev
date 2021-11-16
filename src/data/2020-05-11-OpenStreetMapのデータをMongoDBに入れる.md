---
title: OpenStreetMapのデータをMongoDBに入れる
date: "2020-05-11T10:00:00.000Z"
template: "post"
draft: false
slug: "OpenStreetMap-MongoDB"
category: "OpenStreetMap"
tags:
  - "OpenStreetMap"
  - "OSM"
  - "Python"
description: "OpenStreetMapのデータをMongoDBに入れる"
---

[OpenStreetMap](https://www.openstreetmap.org/)のデータをMongoDBに入れてゴニョゴニョしたいと思ったが，なかなか方法が分からなかったので，行った方法をメモする


[overpy](https://pypi.org/project/overpy/)というライブラリを使用したら，Overpass API経由でOpenStreetMapのデータを簡単に読み込むことも可能だが，いつのデータが読み込まれているかが分からなった．（確認や指定する方法があるのかもしれないがぱっと見分からなかった）  
そのため，今回は[geofabrik](https://download.geofabrik.de/asia/japan.html)からダウンロードできる.osm.pbfファイルを使用する．


2通りの方法を行った．  
1つ目は[osmread](https://pypi.org/project/osmread/)というPythonのライブラリを使用して，OSMのNode情報を取得し，DBに入れる方法．  
2つ目はogr2ogrを使用してpbfファイルを[GeoJSON](https://ja.wikipedia.org/wiki/GeoJSON)に変換し，DBに入れる方法．

## 方法1. osmreadを使用
[osmread](https://pypi.org/project/osmread/)を使用して，MongoDBに入れる方法．

```python
from pymongo import MongoClient
from osmread import parse_file, Node

def get_db(db_name):
  client = MongoClient('mongodb://root:password@mongo:27017')
  return client[db_name]

db = get_db('osm')
coll = db['osm_data']

file = parse_file('./shikoku-latest.osm.pbf')
for data in file:
  if isinstance(data, Node) and len(data.tags.keys() & {'shop'}) > 0:
    one_data = {
      'tags':data.tags,
      'lat':data.lat,
      'lon':data.lon
    }
    coll.insert(one_data)
```

## 方法2. GeoJSON型に変換
方法2つ目  
ogr2ogrを使用してpbfファイルを[GeoJSON](https://ja.wikipedia.org/wiki/GeoJSON)に変換し，MongoDBに入れる方法．


最初にogr2ogrを使用して変換したいosm.pbfファイルをGeoJSONに変換する
```bash
ogr2ogr -f GeoJSON point.json shikoku-latest.osm.pbf points
```

次にGeoJSONをMongoDBに入れる．  
mongoimportを使用するので入っていない場合は別途インストールする．

```bash
cat shikoku-latest.json | jq -c '.features[]' | jq -c 'del(.type)' | mongoimport -u "root" -p "password" --authenticationDatabase "admin" --db points --collection data --type json
```

GeoJSONに変換してMongoDBに入れた場合，データ構造が理由で，ダブルコーテーションが入ってしまい，バックスラッシュでエスケープされている．  
DBからデータを取って使用したい時にはちょっと手間がかかることになってしまう．

```json
{
	"_id" : ObjectId("5e2d060f4ad1536c68cd0143"),
	"properties" : {
		"osm_id" : "254449467",
		"other_tags" : "\"bridge\"=>\"yes\""
	},
	"geometry" : {
		"type" : "Point",
		"coordinates" : [ 134.01391850000002, 33.4288566 ]
	}
}
```
