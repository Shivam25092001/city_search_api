const express = require('express');
const cors = require('cors');
const cityRoutes = require('./routes/cityRoutes');
const path = require('path');

if(process.env.NODE_ENV !== "PRODUCTION"){ 
    const dotenv = require('dotenv');
    dotenv.config();
}
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', cityRoutes.routes);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});



const port = process.env.PORT || 8080;

app.listen(port, ()=> console.log(`Listening on http://localhost:${port}`));


