// Express
import { Router } from 'express';
// Models
import User from '../models/UserModel.js';

const profileRouter = Router();

/*
    When a client sends an HTTP GET request for `/profile/:idNum`,
    where `idNum` is a parameter,
    retrieve the User with the specified `idNum` from the database
    and display the details inside the `profile` view.
*/
profileRouter.get('/profile/:idNum', (req, res) => {
    // query where `idNum` is equal to URL parameter `idNum`
    const query = {idNum: req.params.idNum};

    // fields to be returned
    const projection = 'fName lName idNum';

    /*
        calls the function findOne()
        defined in the `database` object in `../models/db.js`
        this function searches the collection `users`
        based on the value set in object `query`
        the third parameter is a string containing fields to be returned
        the fourth parameter is a callback function
        this called when the database returns a value
        saved in variable `result`
    */
    User.findOne(query, projection).then(result => {
        // If the user does not exist in the database:
        if (result == null) {
            console.log('No such user found: ' + query.idNum);
            res.statusCode = 400;
            res.render('error', {
                code: 400
            });
            return;
        }
        // Otherwise:
        const details = {
            fName: result.fName,
            lName: result.lName,
            idNum: result.idNum
        };
        // render the profile view with the retrieved details
        res.render('profile', details);
    }).catch(err => {
        console.error('An error occured: '+ err);
        res.statusCode = 500;
        res.render('error', {
            code: 500
        });
    });
});

export default profileRouter;