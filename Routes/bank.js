const express = require('express');
const routes = express.Router();
const conn = require('../config/db')

routes.post('/create_acc', async (req, res) => {
    const {
        first_name,
        last_name,
        id_no
    } = req.body;
    const sql = `INSERT INTO Customer(first_name,last_name,national_ID) VALUES(?,?,?)`;
    try {
        const exec = await conn.query(sql, [first_name, last_name, id_no])
        res.send(exec[0])
    } catch (error) {
        res.send(error)
    }
})
routes.get('/users', async (req, res) => {
    const sql = `SELECT * from Customer Limit 10`;
    try {
        const exec = await conn.query(sql)
        res.send(exec[0])
    } catch (error) {
        res.send(error)
    }
})
routes.get('/card/:acc_no', async (req, res) => {
    const sql = "SELECT * FROM Account a Join Customer c on(a.customer_id=c.customer_id) JOIN Credit_Card r on(a.account_no=r.account_no)  where a.account_no=?"
    const account_no = req.params.acc_no

    try {
        const exec = await conn.query(sql, account_no)
        res.send(exec[0])
    } catch (error) {
        res.send(error)
    }
})
routes.get('/user/:id', async (req, res) => {
    const sql = `SELECT * FROM Customer where customer_id=?`;
    const customer_id = req.params.id

    try {
        const exec = await conn.query(sql, customer_id)
        res.send(exec[0])
    } catch (error) {
        res.send(error)
    }
})
routes.get('/account/:id', async (req, res) => {
    const customer_id = req.params.id
    const sql = "SELECT * FROM Customer c JOIN Account a on(c.customer_id=a.customer_id) where c.customer_id=?"
    try {
        const exec = await conn.query(sql, customer_id)
        res.send(exec[0])
    } catch (error) {
        res.send(error)
    }
})
routes.post('/new_acc', async (req, res) => {
    const {
        customer_id
    } = req.body;
    const sql = `INSERT INTO Account(customer_id) VALUES(?)`;
    try {
        const exec = await conn.query(sql, [customer_id])
        res.send(exec[0])
    } catch (error) {
        res.send(error)
    }

})
routes.post('/new_card', async (req, res) => {
    const {
        customer_id,
        account_no
    } = req.body;
    const card_no = Math.floor(1000000000000000 + Math.random() * 9000000000000000)
    const cvv = Math.floor(100 + Math.random() * 900)
    const expiry_date = new Date();
    expiry_date.setFullYear(expiry_date.getFullYear() + 4);
    const sql = `INSERT INTO Credit_Card(customer_id,account_no,card_no,expiry_date,cvv) VALUES(?,?,?,?,?)`;
    try {
        const exec = await conn.query(sql, [customer_id, account_no, card_no, expiry_date, cvv])
        res.send(exec[0])
    } catch (error) {
        res.send(error)
    }

})
module.exports = routes;