up:
	docker compose up -d
down:
	docker compose down --remove-orphans
build:
	docker compose build --no-cache --force-rm
destroy:
	docker compose down --rmi all --volumes --remove-orphans
app:
	docker compose exec app sh
sql:
	docker compose exec db bash -c 'mysql -u $$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
db:
	docker compose exec db bash