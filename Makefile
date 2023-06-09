init: docker-down-clear \
	  frontend-clear \
	  docker-pull docker-build docker-up \
	  frontend-init

up: docker-up
down: docker-down
restart: down up

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

docker-down-clear:
	docker-compose down -v --remove-orphans

docker-pull:
	docker-compose pull

docker-build:
	docker-compose build

frontend-clear:
	docker run --rm -v ${PWD}:/app -w /app alpine sh -c 'rm -rf .ready'

frontend-copy-env:
	cp .env.example .env

frontend-init: frontend-yarn-install frontend-copy-env frontend-ready

frontend-yarn-install:
	docker-compose run --rm frontend-node-cli yarn install

frontend-ready:
	docker run --rm -v ${PWD}:/app -w /app alpine touch .ready

frontend-lint:
	docker-compose run --rm frontend-node-cli yarn lint

frontend-format:
	docker-compose run --rm frontend-node-cli yarn format