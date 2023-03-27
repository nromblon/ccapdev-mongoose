// Express
import { Router, urlencoded } from "express";
// Models
import User from "../models/UserModel.js";

const signupRouter = Router();

// Informs express that the request body will be in urlencoded format (https://expressjs.com/en/api.html#express.urlencoded)
signupRouter.use(urlencoded({ extended: true }));
// signupRouter.use(json()); // make sure to import json instead of urlencoded from the express module

/*
  execute function getSignUp()
  defined in object `signupController` in `../controllers/signupController.js`
  when a client sends an HTTP GET request for `/signup`
*/
signupRouter.get("/signup", (req, res) => {
  res.render("signup");
});

/*
  execute function postSignUp()
  defined in object `signupController` in `../controllers/signupController.js`
  when a client sends an HTTP POST request for `/signup`
*/
signupRouter.post("/signup", (req, res) => {
  /*
    when submitting forms using HTTP POST method
    the values in the input fields are stored in `req.body` object
    each <input> element is identified using its `name` attribute
    Example: the value entered in <input type="text" name="fName">
    can be retrieved using `req.body.fName`
  */
  const fName = req.body.fName;
  const lName = req.body.lName;
  const idNum = req.body.idNum;
  const pw = req.body.pw;
  const user = {
    fName: fName,
    lName: lName,
    idNum: idNum,
    pw: pw,
  };

  /*
    calls the function insertOne()
    defined in the `database` object in `../models/db.js`
    this function adds a document to collection `users`
  */
  User.create(user)
    .then((result) => {
      console.log("Added: " + result);
      res.statusCode = 200;
      /*
        upon adding a user to the database,
        redirects the client to `/success` using HTTP GET,
        defined in `../routes/routes.js`
        passing values using URL
        which calls getSuccess() method
        defined in `./successController.js`
      */
      res.redirect(
        "/success?fName=" + fName + "&lName=" + lName + "&idNum=" + idNum
      );
    })
    .catch((err) => {
      console.error(err);
      res.status = 500;
      res.render("error", {
        code: 500
      });
    });
});

export default signupRouter;
