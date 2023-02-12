const express = require('express')
const app = express();
const bank = require('./Routes/bank')
const transaction = require("./Routes/transactions")

app.use(express.json())
app.use('/api/bank', bank)
app.use('/api/trans', transaction)

app.get('/', (req, res) => {
    res.send('hey')
})
const PORT = process.env.PORT || 3203
app.listen(PORT, () => console.log(`listening on port ${PORT}`))