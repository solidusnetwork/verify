.PHONY: bootstrap migrate dev worker test services models

## Download face-api.js ML models for KYC pipeline
models:
	bash apps/backend/scripts/download-models.sh

## Run once to set up databases and generate .env values
bootstrap: models
	cd apps/backend && pnpm exec tsx scripts/bootstrap.ts

## Re-run migrations against the dev database (requires .env to exist)
migrate:
	cd apps/backend && pnpm exec tsx src/db/migrate.ts

## Start the API server in watch mode (requires .env to exist)
dev:
	cd apps/backend && pnpm dev

## Start the KYC background worker (requires .env to exist)
worker:
	cd apps/backend && pnpm worker

## Run all tests (SDK + backend)
test:
	cd apps/backend && pnpm test
	cd ../packages/@solidus/sdk && pnpm test

## Start Homebrew services (Postgres, Redis, RabbitMQ)
services:
	brew services start postgresql@16
	brew services start redis
	brew services start rabbitmq
	@echo ""
	@echo "Services started."
	@echo "RabbitMQ management UI: http://localhost:15672 (guest/guest)"
