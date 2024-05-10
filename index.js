import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import jQuery from "jquery";
import jsdom from"jsdom"


const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();


const apiKey = "50f7877f4da35ee50991c11f2e909760"


// const url =     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
env.config();
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  db.connect();
 
  
// Creating a window with a document 


app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// $("#results").text("hello")


  app.get("/", async (req, res) => {



    res.sendFile(__dirname + "/public/index.html");




  });
  app.post("/mylocation", async (req, res) => {

const city = req.body.city
const country = req.body.country

const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${apiKey}`

try {

    const result = await axios.get(locationUrl);
    const dbResult = await db.query("SELECT country FROM countries WHERE LOWER(country_name) = $1",[country.toLowerCase()])
console.log(result)
console.log(dbResult)
    res.redirect("/")
  } catch (error) {
    res.redirect("/")
  }

   
  });



  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  