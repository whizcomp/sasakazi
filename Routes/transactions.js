const express = require('express');
const routes = express.Router();
const conn = require('../config/db');

routes.get('/balance/:acc_no', async (req, res) => {
    const {
        acc_no
    } = req.params;
    const sql = "SELECT c.first_name,c.last_name,a.current_balance,a.account_no FROM Account a Join Customer c ON(a.customer_id=c.customer_id) where a.account_no=?"
    try {
        const exec = await conn.query(sql, acc_no)
        res.send(exec[0])
    } catch (error) {
        res.send(error)
    }
})
routes.put('/withdraw', async (req, res) => {
    const {
        account_no,
        amount
    } = req.body;
    let curr_bal;
    const sql1 = "SELECT c.first_name,c.last_name,a.current_balance,a.account_no FROM Account a Join Customer c ON(a.customer_id=c.customer_id) where a.account_no=?";
    try {
        const exec = await conn.query(sql1, account_no)
        curr_bal = exec[0][0].current_balance

    } catch (error) {
        console.log(error);
        return res.send(error)
    }
    if (curr_bal < amount) return res.send(`failed insufficient balance to withdraw ksh ${amount} your current balance is ${curr_bal}`);

    const newBalance = curr_bal - amount
    const sql2 = `INSERT INTO Transact(account_no,amount,mode_id) Values(?,?,?);  UPDATE Account SET current_balance=${newBalance} WHERE account_no=${account_no};`

    try {
        const exec = await conn.query(sql2, [account_no, amount, 1])
        res.send(exec[0])
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})
routes.put('/deposit', async (req, res) => {
    const {
        account_no,
        amount
    } = req.body;
    let curr_bal;
    const sql1 = "SELECT c.first_name,c.last_name,a.current_balance,a.account_no FROM Account a Join Customer c ON(a.customer_id=c.customer_id) where a.account_no=?";
    try {
        const exec = await conn.query(sql1, account_no)
        curr_bal = exec[0][0].current_balance

    } catch (error) {
        console.log(error);
        return res.send(error)
    }
    const newBalance = curr_bal + amount

    const sql2 = ` INSERT INTO Transact(account_no,amount,mode_id) Values(?,?,?); UPDATE Account SET current_balance=${newBalance} WHERE account_no=${account_no}`
    try {
        const exec = await conn.query(sql2, [account_no, amount, 2])
        res.send(exec[0])
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})



module.exports = routes;