const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const app = express();
const pg = require('pg');
const Pool = pg.Pool;



app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ partialsDir: "./views/partials", viewPath: './views', layoutsDir: './views/layouts' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static("public"));


const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/fruitdb';
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});


const PORT = process.env.PORT || 3007;


app.get("/", (req, res, next) => {
   
});









app.listen(PORT, () => { console.log(`Listening at PORT : ${PORT}`) })
