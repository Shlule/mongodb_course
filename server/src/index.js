const express = require('express')
require('../db/mongoose')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


const studentRouter = require('./routes/student')
app.use(studentRouter)

const stuffTypeRouter = require('./routes/stuffType')
app.use(stuffTypeRouter)

const stuffRouter = require('./routes/stuff')
app.use(stuffRouter)

const empruntRouter = require('./routes/emprunt')
app.use(empruntRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port);
});