# BACKEND APP WITH NODE AND MYSQL

This is non-optimized minimal backend app with mysql and node. Backend app theme is "TICKET MOVIE BOOKING"

## Requirements

- NodeJS v12.18.3
- MySQL v10.4.11-MariaDB

## How To Run This App

- Make sure you had clone this repo
- Copy environment from `.env.example` to `.env`
- Configure your `.env` file according to your Postgres credentials
- Open your terminal in this project and run
  ```
  npm i
  ```
- And then
  ```
  npx nodemon
  ```

## API SPECS

- POST `/auth/login` Route for login to existing user
- POST `/auth/register` Route for register new user
- POST `/forgot_password` Route for request reset pasword **(Not done yet)**
- POST `/forgot_password/:code` Route for change password **(Not done yet)**
- GET `/movies` Route for get all movies
- GET `/movies/:id` Route for get movie detail by id
- POST/PUT `/movies` Route for adding movie
- PATCH/PUT `/movies/:id` Route for modify item on movie by id
- DELETE `/movies/:id` Route for delete item on movie by id
- GET `/genres` Route for get all genres
- GET `/genres/:id` Route for get genre detail by id
- POST/PUT `/genres` Route for adding genre
- PATCH/PUT `/genres/:id` Route for modify item on genre by id
- DELETE `/genres/:id` Route for delete item on genre by id
- GET `/cinemas` Route for get all cinemas
- GET `/cinemas/:id` Route for get cinema detail by id
- POST/PUT `/cinemas` Route for adding cinema
- PATCH/PUT `/cinemas/:id` Route for modify item on cinema by id
- DELETE `/cinemas/:id` Route for delete item on cinema by id
- GET `/times` Route for get all times
- GET `/times/:id` Route for get time detail by id
- POST/PUT `/times` Route for adding time
- PATCH/PUT `/times/:id` Route for modify item on time by id
- DELETE `/times/:id` Route for delete item on time by id
