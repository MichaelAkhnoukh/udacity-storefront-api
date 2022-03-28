# Udacity Storefront API Project

## Installation
- clone the repo
```
git@github.com:MichaelAkhnoukh/udacity-storefront-api.git
```
- install dependancies 
```
npm install
```

## How to use
- create .env file with the following
```
APP_ENV=dev

SERVER_PORT=3000

DB_HOST=127.0.0.1
DB_PORT=5432
POSTGRES_DB=full_stack_dev
POSTGRES_DB_TEST=full_stack_test
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123

BCRYPT_PASSWORD=this-is-a-bcrypt-password
SALT_ROUNDS=10

TOKEN_SECRET=this-is-jwt-secret
```
- start the database server 
```
docker-compose up -d
```
- run database migrations
```
npx db-migrate up
```
- build the project 
```
npm run build
```
- start the server
```
npm run start
```

## Testing
```
npm run test
```