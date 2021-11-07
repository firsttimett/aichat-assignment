# aichat-backend

This is the backend service which contains 2 APIs for company ABC celebration campaign voucher giving.
This is only executable on linux/macbook (sorry).

## Prerequisite :

1. **_Install Docker_**
2. **_Install Node v12 at least_**

## Running the service locally

1. Install dependencies

> `npm ci`

2. Build the routes and generate swagger file at ./dist/spec/swagger.json

> `npm run build`

3. Run with docker

> `npm run start:fresh`

4. View service logs to check whether the service started

> `npm run logs`

5. Database credentials is in .env

## Swagger hosted at http://localhost:3000/docs after service is running

List of error response
Http status code | custom code | message
--- | --- | ---
400 | ER001 | ERR01: Sorry, only 1 voucher is redeemable for each customer.
400 | ER002 | ERR02: Sorry, please check eligibility again because you took more than 10 minutes.
400 | ER003 | ERR03: Invalid image, please submit another.
400 | ER004 | ERR04: Sorry, please check eligibility again because you took more than 10 minutes.
500 | ER005 | ERR05: Server Generic Error
