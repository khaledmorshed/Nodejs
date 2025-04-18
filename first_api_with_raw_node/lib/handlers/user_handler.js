// dependencies
const data = require('../data_lib/data');
const { hash } = require('../helpers/utils');
const { parseJSON } = require('../helpers/utils');

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callBack) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];

    if (acceptedMethod.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callBack);
    } else {
        callBack(405);
    }
};

// private scaffolding
handler._users = {};

handler._users.post = (requestProperties, callBack) => {
    // const firstName = typeof requestProperties.body.firstName === 'string' &&
    // requestProperties.body.firstName.trim().length > 0
    //     ? requestProperties.body.firstName.trim()
    //     : false;

    const firstName =        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

    const phone =        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    const tOfAgreement =        typeof requestProperties.body.tOfAgreement === 'boolean' &&
        requestProperties.body.tOfAgreement
            ? requestProperties.body.tOfAgreement
            : false;

    if (firstName && lastName && phone && password && tOfAgreement) {
        // make sure that the user doesn't already exist
        data.read('users', phone, (err1) => {
            if (err1) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tOfAgreement,
                };

                // store the data in db
                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callBack(200, { message: 'User was created successfully' });
                    } else {
                        callBack(500, {
                            error: 'Could not create user!',
                        });
                    }
                });
            } else {
                callBack(500, {
                    error: 'There was a problem in server side',
                });
            }
        });
    } else {
        callBack(400, {
            error: 'You have a problem in your request',
        });
    }
};
handler._users.get = (requestProperties, callBack) => {
    const phone =        typeof requestProperties.queryObject.phone === 'string' &&
        requestProperties.queryObject.phone.trim().length === 11
            ? requestProperties.queryObject.phone
            : false;

    if (phone) {
        // look up the user
        data.read('users', phone, (err, userData) => {
            // ParseJson firstly made userData to a object
            // when an object(userData) is spreeded(...) and assign in a variable it becomes object(user)
            const user = { ...parseJSON(userData) }; // parseJson works when object is not nested
            if (!err && user) {
                delete user.password;
                callBack(200, user);
            } else {
                callBack(404, {
                    error: 'Requested user was not found!',
                });
            }
        });
    } else {
        // status code 404 when something not getting found.
        callBack(404, {
            error: 'Requested user was not found!',
        });
    }
};
handler._users.put = (requestProperties, callBack) => {
    const phone =        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const firstName =        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;

    const lastName =        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;

    const password =        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    if (phone) {
        if (firstName || lastName || password) {
            // look up the use
            data.read('users', phone, (err, user) => {
                const userData = { ...parseJSON(user) };
                if (!err && userData) {
                    if (firstName) {
                        userData.firstName = firstName;
                    }
                    if (lastName) {
                        userData.lastName = lastName;
                    }
                    if (password) {
                        userData.password = hash(password);
                    }
                    // store in database
                    data.update('users', phone, userData, (err2) => {
                        if (!err2) {
                            callBack(200, {
                                message: 'Update successfully!',
                            });
                        } else {
                            callBack(500, {
                                error: 'There was a problem in server side!',
                            });
                        }
                    });
                } else {
                    callBack(400, {
                        error: 'You have problem in your request!',
                    });
                }
            });
        } else {
            callBack(400, {
                error: 'You have problem in your request!',
            });
        }
    } else {
        callBack(400, {
            error: 'Invalid phone number. Please try again!',
        });
    }
};
handler._users.delete = (requestProperties, callBack) => {
    const phone =        typeof requestProperties.queryObject.phone === 'string' &&
        requestProperties.queryObject.phone.trim().length === 11
            ? requestProperties.queryObject.phone
            : false;

            console.log(phone);

    if (phone) {
        // look up the user
        data.read('users', phone, (err1, userData) => {
            if (!err1 && userData) {
                // delete the user from database
                data.delete('users', phone, (err2) => {
                    if (!err2) {
                        callBack(200, {
                            message: 'User was successfully deleted!',
                        });
                    } else {
                        callBack(500, {
                            error: 'There was a server side erro2!',
                        });
                    }
                });
            } else {
                callBack(500, {
                    error: 'There was a server side error1!',
                });
            }
        });
    } else {
        callBack(400, {
            error: 'There was a problem in you request!',
        });
    }
};

module.exports = handler;
