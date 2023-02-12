# Storefront Node.js Backend API Project

## Introduction

- This is a Node.js based RESTful API project that provides a set of endpoints for interacting with a database.
- The API allows clients to retrieve, create, update, and delete data user , product and order information.

## Getting Started

- Clone the repository to your local machine: git clone https://github.com/mohaasrar/storefront-backend-api.git
- Install dependencies: `npm install`
- Set up the environment variables in a .env file
- replace \*\*\* with the correct value to both on .env and database.json files

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=sfdb
POSTGRES_TEST_DB=sfdbTest
POSTGRES_USER==***
POSTGRES_PASSWORD=Text1234
Env=test
BCRYPT_PASSWORD==***
SALT_ROUNDS=10
TOKEN_SECRET=***
```

- create database directory from db or using using `db-migrate db:drop sfdb`
- migrate the database using `db-migrate up`

## Start the app

- Start the development server: - make sure to set the env variable to dev - To build the app `npm run watch` - To start the app and get access via http://127.0.0.1:3000

## Test the app

```
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "port": 5432,
    "database": "sfdb",
    "user": "***",
    "password": "###"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "port": 5433,
    "database": "sfdbTest",
    "user": "###",
    "password": "###"
  }
}
```

- To test the app run `npm test`
- To restar the app run drop and recreate the db
- To drop the db `db-migrate db:drop sfdbTest`
- To create the db `db-migrate db:create sfdbTest`
