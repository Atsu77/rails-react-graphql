# command

1. envファイルの名称を変更
```sh
mv env .env
```

2. Docker上でrails new をするため以下のコマンドを実行．
```sh
docker-compose run --no-deps web rails new . --force --database=postgresql
```
apiモードであれば
```sh
docker-compose run --no-deps web rails new . --api --force --database=postgresql
```

3. イメージをBuild
```sh
docker-compose build
```

4. DB接続を設定
```yml:database.yml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  host: <%= ENV.fetch("POSTGRES_HOST") %>
  username: <%= ENV.fetch("POSTGRES_USER") %>
  password: <%= ENV.fetch("POSTGRES_PASSWORD") %>

development:
  <<: *default
  database: app_development

test:
  <<: *default
  database: app_test

production:
  <<: *default
  database: app_production
```

5. データベースを作成
```sh
docker-compose run web rails db:create
```