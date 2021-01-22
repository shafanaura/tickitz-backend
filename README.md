# BACKEND APP WITH NODE AND POSTGRESQL

This is non-optimized minimal backend app with postgresql and node. Backend app theme is "E-Commerce"

## Requirements

- NodeJS v12 LTS
- PostgreSQL v10 LTS

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

- POST `/api/v1/login` Route for login to existing user
- POST `/api/v1/register` Route for register new user
- POST `/api/v1/forgot_password` Route for request reset pasword **(Not done yet)**
- POST `/api/v1/forgot_password/:code` Route for change password **(Not done yet)**
- GET `/api/v1/flash_sale` Route for get item on flash sale list
- GET `/api/v1/products` Route for get all products
- GET `/api/v1/products/:productId` Route for get products detail
- GET/PATCH `/api/v1/profile` Route for get and change currently logged user data
- GET `/api/v1/cart/:itemId` Route for adding items to cart
- PATCH/DELETE `/api/v1/cart/:itemId` Route for modify item on cart **(Not done yet)**
- GET/POST `/api/v1/checkout` Route for view calculated items on invoice and confirm order
- POST `/api/v1/payment/:invoiceId` Route for payment not paid invoice **(Not done yet)**

- POST `/
