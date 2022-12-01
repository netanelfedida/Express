const express = require('express');
const app = express();
const cors = require("cors");
app.use(cors())
app.use(express.static('public'));

const userRouter = require('./routes/data')

app.use('/', userRouter)


app.listen(8000)