// Express
import { Router } from "express";
// Routers
import signupRouter from "./signupRouter.js";
import profileRouter from "./profileRouter.js";
import successRouter from "./successRouter.js";

const routes = Router();

/*
  When a client sends an HTTP GET request for `/`,
  render the `index` view.
*/
routes.get("/", (req, res) => {
  res.render("index");
});

/*
  Use routes defined in ./signupRouter.js
*/
routes.use(signupRouter);

/*
  Use routes defined in ./successRouter.js
*/
routes.use(successRouter);

/*
  Use routes defined in ./profileRouter.js
*/
routes.use(profileRouter);

/* 
  If the route is not defined in the server, render `../views/error.hbs`.
  Always define this as the last middleware!
*/
routes.use((req, res) => {
  res.render("error", {
    code: 404,
  });
});

/*
  exports the object `routes` (defined above)
  when another script exports from this file
*/
export default routes;
