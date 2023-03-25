// Setup Modules
import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
// Express Modules
import express from 'express';
import exphbs from 'express-handlebars';

// Routes
import routes from './src/routes/routes.js';
// DB
import db from './src/models/db.js';

const app = express();
const port = process.env.SERVER_PORT ?? 3000; // if process.env.SERVER_PORT is undefined, use 3000 instead. (This is known as nullish coalescing)

// Define an async function called startServer
const startServer = async () => {
    // Express App Setup
    // set `exphbs` as view engine
    app.set('view engine', exphbs.engine({
        extname: 'hbs';
        defaultLayout: false
    }));

    // set the folder `public` as folder containing static assets
    // such as css, js, and image files
    const __dirname = dirname(fileURLToPath(import.meta.url));
    app.use(express.static(__dirname + "/public"));

    // Assign routes
    app.use(routes);

    // If the route is not defined in the server, render `../views/error.hbs`.
    // Always define this as the last middleware!
    app.use((req, res) => {
        res.render('error');
    });

    // connects to the database
    await db.connect();

    // bind the server to a specific port
    app.listen(port, () => {
        console.log('app listening at port ' + port);
    });
}

startServer();