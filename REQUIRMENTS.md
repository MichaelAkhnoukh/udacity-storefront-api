# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
```
GET /api/products/
```
- Show
```
GET /api/products/<id>
```
- Create [token required]
```
POST /api/products/

example:
{
	"name": "Apple",
	"price": 10,
	"category": "food"
}
```
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
```
GET /api/users/
```
- Show [token required]
```
GET /api/users/<id>
```
- Create N[token required]
```
POST /api/users/

example:
{
	"firstName": "michael",
	"lastName": "hany",
	"email": "michael@example.com",
	"password": "test1234"
}
```
- login
```
POST /api/users/login/

example:
{
	"email": "michael@example.com",
	"password": "test1234"
}
```

#### Orders
- Current Order by user (args: user id)[token required]
```
GET /api/orders?userId=<id>
```
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
```
GET /api/orders?userId=<id>&status=complete
```

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password
- email

#### Orders
- id
- user_id
- status of order (active or complete)

#### OrderProducts
- id of each order
- id of each product in the order
- quantity of each product in the order