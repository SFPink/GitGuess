setup: build deps up

deps: ## Download modules
	docker-compose run app npm install

build: ## Build containers
	docker-compose build

up: ## Start containers in foreground
	docker-compose up -d --remove-orphans

down: ## Take container down
	docker-compose down

stop: ## Stop containers
	docker-compose -stop 

test.unit: ## Run tests
	docker-compose exec app npm run test

test.coverage: ## Run coverage tests
	docker-compose exec app npm run coverage

restart: stop up
