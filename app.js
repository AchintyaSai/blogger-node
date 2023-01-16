
const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()

const loginRoutes = require('./routes/loginRoutes');
const otpRoutes = require('./routes/otpRoutes');
const postsRoute = require('./routes/postsRoutes')
const cryptoLayer = require('./core/crypto-layer')

const dbOperation = require('./database/db-operations');

app.use(express.json());
app.use(cors())

app.use(cryptoLayer.decryptBody);
app.use('/login', loginRoutes);
app.use('/otp', otpRoutes);
app.use('/posts', postsRoute)


app.listen(8080, () => {
    console.log("Server running on port 8080")
})

// app.use(cryptoLayer.encryptResponse);


// app.use('/', (req, res) => {
//     req.statusCode = 500;
//     req.params
//     res.writeHead(404, "Something went dfsdfsdfv")
    
//     res.write("Hii")
//     return res.end();
// })
