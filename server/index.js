const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const cityRoutes = require('./routes/cityRoutes');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', cityRoutes.routes);

const port = process.env.PORT || 4000;

app.listen(port, ()=> console.log(`Listening on http://localhost:${port}/api`));


