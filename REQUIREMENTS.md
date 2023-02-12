# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Users

| Method   | Endpoints                              |
| -------- | -------------------------------------- |
| `Create` | `/users/create` [POST]                 |
| `Create` | `/users/login` [POST]                  |
| `Show`   | `/products/:id` [GET]                  |
| `Index`  | `/users` [GET] [token required]        |
| `Update` | `/users/:id` [PUT] [token required]    |
| `Delete` | `/users/:id` [DELETE] [token required] |

#### Products

| Method           | Endpoints                                  |
| ---------------- | ------------------------------------------ |
| `Create`         | `/products/create` [POST] [token required] |
| `Show`           | `/products/:id` [GET]                      |
| `Index`          | `/products` [GET]                          |
| `getTopfiveProd` | `/products/top/:top` [GET]                 |
| `getProdByCate`  | `/products/category/:cate` [GET]           |
| `Delete`         | `/products/:id` [GET] [token required]     |

#### Orders

| Method                | Endpoints                                |
| --------------------- | ---------------------------------------- |
| `Create`              | `/orders/create` [POST] [token required] |
| `Show`                | `/orders/:id` [GET] [token required]     |
| `Index`               | `/orders` [GET] [token required]         |
| `Update`              | `/orders/:id` [PUT] [token required]     |
| `Delete`              | `/orders/:id` [DELETE] [token required]  |
| `completordersbyuser` | `/orders/complete/:userid` [GET]         |
| `currentordersbyuser` | `/orders/complete/:userid` [GET]         |

## Data Shapes

#### User

Table: _users_

- id `SERIAL PRIMARY KEY`
- username `VARCHAR`
- firstname `VARCHAR`
- lastname `VARCHAR`
- password `VARCHAR`

#### Product

Table: _products_

- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`

#### Orders

Table: _orders_

- id `SERIAL PRIMARY KEY`
- user_id `INTEGER` `REFERENCES users(id)`
- status `VARCHAR`

Table: _order_products_

- order_id `INTEGER` `REFERENCES orders(id)`
- product_id `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`
