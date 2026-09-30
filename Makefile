.PHONY: dev server frontend db migrate build

dev:
    npm install
    npm run dev

server:
    npm run dev -w server

frontend:
    npm run dev -w frontend

build:
    npm run build

db:
    docker compose -f infra/docker/docker-compose.yml up db -d

migrate:
    cd server && npx prisma migrate dev
