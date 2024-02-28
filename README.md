# Google Cloud Emulator Hands On Repository
[Events](https://gcpug-shonan.connpass.com/event/311013/)

## 事前準備
- gcloudコマンドの実行ができること
- [spanner-cli](https://github.com/cloudspannerecosystem/spanner-cli)のインストール
  - `go install`コマンドを実行するため、合わせてGoのインストールも必要になる
- コンテナの実行環境
  - コマンドの裏でコンテナを起動するため

## エミュレータを実行する

### 準備

```bash
# 新たな構成(Configuration)を作成する
$ gcloud config configurations create emulator
# Google Cloudに対するリクエストの認証をスキップする
$ gcloud config set auth/disable_credentials true
# ダミーのプロジェクトを設定する
$ gcloud config set project emulator-project
# 構成の一覧を表示(emulatorがactiveであることを確認する）
$ gcloud config configurations list
```

### エンドポイントの変更

```bash
# 新たな構成(Configuration)を作成する
$ gcloud config set api_endpoint_overrides/spanner http://localhost:9020/
# 設定を確認する
$ gcloud config list
```

### Spannerの作成

```bash
# Spanner エミュレータをスタート (-d オプションでバックグラウンド起動)
$ gcloud emulators spanner start

# インスタンス作成のコマンドを実行
$ gcloud spanner instances create emulator-instance \
         --description="Local Spanner Instance" \
         --nodes=1 \
         --config=emulator-config

# 作成したSpannerインスタンスを表示
$ gcloud spanner instances describe emulator-instance
```

### データベースの作成

```bash
# データベースの作成
$ gcloud spanner databases create localdb \
         --instance emulator-instance

# DDLを実行(類似のオプションとして--ddl-fileオプションもある)
$ gcloud spanner databases ddl update localdb \
         --instance=emulator-instance \
         --ddl="create table users ( id int64 not null,name string(max) not null) primary key (id)"

# 実行したDDLを表示
$ gcloud spanner databases ddl describe localdb --instance emulator-instance
```

### レコードの追加
```bash
# spanner-cliで接続する
$ export SPANNER_EMULATOR_HOST=localhost:9010
$ spanner-cli -p emulator-project -i emulator-instance -d localdb

# SQL文を実行
spanner> show tables;
spanner> insert into users (id, name) values (1, 'kaedemalu');
spanner> select * from users;
```

## エミュレータをアプリケーションから実行する
```bash
$ cd app_client
# パッケージのインストール
$ npm install
# クライアントの実行
$ node client.js
```

##  Terraformの実行

※一度エミュレータを落として再度立ち上げておくこと
```bash
$ cd terraform
$ terraform init
$ terraform plan
$ terraform apply
```