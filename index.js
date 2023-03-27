// Setup Modules
import "dotenv/config";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// Express Modules
import express from "express";
import exphbs from "express-handlebars";
import favicon from "serve-favicon";
// Routes
import routes from "./src/routes/index.js";
// DB
import db from "./src/models/db.js";

const app = express();
const port = process.env.SERVER_PORT ?? 3000; // if process.env.SERVER_PORT is undefined, use 3000 instead. (This is known as nullish coalescing)

// Define an async function called startServer
const startServer = async () => {
  // Express App Setup
  // set `exphbs` as view engine
  app.engine(
    "hbs",
    exphbs.engine({
      extname: "hbs",
      defaultLayout: false,
      helpers: {
        isEqual: (val1, val2) => {
          return val1 === val2;
        },
      },
    })
  );
  app.set("view engine", "hbs");
  // directory for the views folder
  app.set("views", "./src/views");

  /*
    set the folder `public` as folder containing static assets
    such as css, js, and image files
  */
  const __dirname = dirname(fileURLToPath(import.meta.url));
  app.use(express.static(__dirname + "/public"));

  /*
    A 'favicon' is the icon that appears on the browser's tab when viewing the web application.
    See the following link for a favicon generator: https://favicon.io/favicon-generator/
    This implementation specifically uses the serve-favicon package: https://www.npmjs.com/package/serve-favicon
  */
  app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

  // Assign routes (uses src/routes/index.js)
  app.use(routes);

  // connects to the database
  await db.connect();

  // bind the server to a specific port
  app.listen(port, () => {
    console.log("app listening at port " + port);
  });
};

startServer();
