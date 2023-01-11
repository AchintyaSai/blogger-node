
const express = require('express');
const cors = require('cors')
const app = express();

const loginRoutes = require('./routes/loginRoutes');
const dbOperation = require('./database/db-operations')

app.use(express.json());
app.use(cors())

app.use('/login',loginRoutes )

app.listen(8080, ()=> console.log("Server running on port 8080"))

// app.use('/', (req, res) => {
//     req.body
//     res.writeHead(404, "Something went dfsdfsdfv")
//     res.write("Hii")
//     return res.end();
// })
