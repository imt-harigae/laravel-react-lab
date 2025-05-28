# Makefile

# 以下1~7を実行
setup:
	$(MAKE) backend_env
	$(MAKE) frontend_env
	$(MAKE) build
	$(MAKE) composer_install
	$(MAKE) npm_install
	$(MAKE) up
	$(MAKE) migrate

# 1. backend/.envの作成
backend_env:
	cd backend && cp .env.example .env

# 2. frontend/.envの作成
frontend_env:
	cd frontend && cp .env.example .env

# 3. コンテナのビルド
build:
	docker compose build

# 4. composer install
composer_install:
	docker compose run --rm backend composer install

# 5. npm install
npm_install:
	docker compose run --rm frontend npm install

# 6. 起動
up:
	docker compose up -d

# 7. マイグレーションを実行
migrate:
	docker compose exec backend php artisan migrate:fresh --seed

# 8. コンテナを停止
down:
	docker compose down

# 9. コンテナを削除
down_rm:
	docker compose down --volumes

# 10. キャッシュのクリア
clear:
	docker compose exec backend php artisan cache:clear
	docker compose exec backend php artisan config:clear
	docker compose exec backend php artisan route:clear
	docker compose exec backend php artisan view:clear