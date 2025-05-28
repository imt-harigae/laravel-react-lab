# laravel-react-lab

## Laravel + React + Vite + TypeScript Fullstack 開発環境（Docker構築）

このリポジトリは、以下の技術スタックを使用したフルスタック開発の学習環境です。

- Laravel（APIバックエンド）
- React（Vite + TypeScript、フロントエンド）
- MySQL（データベース）
- Nginx（Webサーバー）
- Docker / docker-compose（ローカル開発環境）

## 📦 ディレクトリ構成

```
laravel-react-lab/
├── backend/                  # Laravel API
│   ├── Laravelプロジェクト     # /appや/databaseなど
│   └── .env
├── frontend/                 # React + Vite + TypeScript
│   ├── src/                  # Reactプロジェクト
│   └── .env
├── docker/
│   ├── nginx/
│   │   └── default.conf      # Nginx
│   ├── php/
│   │   └── Dockerfile        # Laravel + PHP
│   └── frontend/
│       └── Dockerfile        # React + Node.js
├── docker-compose.yml
└── README.md
```


## 📚 バージョン
- Laravel 12.15.0
- PHP 8.4.7
- Composer 2.8.9
- React 19.1.0
- Vite 6.3.5
- @vitejs/plugin-react 4.5.0
- Node.js 24.0.2
- npm 11.3.0
- MySQL 8.0.42
- Nginx 1.27.5

## 🛠️ 初回構築手順
Makefileを使用して構築
```
make setup
```

## 💻 動作確認
Laravel アプリの表示確認
- http://localhost

React (Vite) アプリの表示確認
- http://localhost:5173

API 動作確認
- http://localhost/api/test

## ⚠️ 以下手順は構築時の参考手順 / 作業不要
1. docker-compose.ymlを元にDockerイメージをビルド

```
docker compose build
```

2. Laravel・React プロジェクトの初期化

```
docker compose run --rm backend composer create-project laravel/laravel .

docker compose run --rm frontend sh -c "npm create vite@latest . -- --template react-ts && npm install"
```

3. Docker コンテナを起動

```
docker compose up -d
```

4. Laravel開発環境のセットアップ

    .envファイルの設定
```
APP_LOCALE=en
↓
APP_LOCALE=ja

------------------------

DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=

↓

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel_react_lab
DB_USERNAME=root
DB_PASSWORD=root
```

5. データベースのマイグレーション

```
docker compose exec backend php artisan migrate
```

6. LaravelのAPIルーティング設定

✅ backend/bootstrap/app.php
```
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php', // ✅APIルーティング追加
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
```

✅ backend/routes/api.php
```
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;

Route::get('/test', function () {
    return response()->json(
        ['message' => 'API動作確認OK'],
        Response::HTTP_OK,
        [],
        JSON_UNESCAPED_UNICODE
    );
});
```