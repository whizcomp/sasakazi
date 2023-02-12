# sasakazi

Endpoint https://sasakazi.kipkoechdev.com

## Endpoints

## Create user

### /api/bank/create_acc (POST)

###### Body
 first_name,
 last_name,
 id_no

## Get all the users
### /api/bank/users (GET)


## Get Card From specific accounts

### /api/bank/card/{acc_no} (GET)

## Get account details 

### /api/bank/account/{id} (GET)

## Get user details 

### /api/bank/account/{id} (GET)

## Create new account 
### /api/bank/new_acc
###### Body
customer_id


## New Credit card

### /api/bank/new_card

###### Body
customer_id
account_no

## Check balance

### /api/trans/balance/{acc_no} (GET)

#
## Withdraw

### /api/trans/withdraw (PUT)
##### body
account_no
amount

### /api/trans/deposit (PUT)
##### body
account_no
amount

