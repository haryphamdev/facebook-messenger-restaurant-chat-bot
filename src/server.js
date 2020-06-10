require("dotenv").config();
import  express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import initCronJob from "./config/cronJob";

let app = express();

//use body-parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);

// init all web routes
initWebRoutes(app);

//init cron job
initCronJob();

let port = process.env.PORT || 8080;

app.listen(port, ()=>{
   console.log(`App is running at the port ${port}`);
});


