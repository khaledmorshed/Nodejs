const createError = require('http-errors');

// 404 not found handler
function notFoundHandler(req, res, next){

    console.log("not found");

    next(createError(404, "Your requested content was not found!"));
};

// default error handler
function errorHandler(err, req, res, next){

    res.locals.error = process.env.NODE_ENV === "development" ? err : {message: err.message};

    // here if has status then that statuscode otherwise send 500
    res.status(err.status || 500);

    // if response type is html then return html response other wise return json response
    if(res.locals.htm){
        res.render('error', {
            title: "Error page"
        });
    }else{
        // json reponse
        res.json(res.locals.error);
    }

    // // method-1
    // res.locals.title = "Error Page";
    // res.render('error');

    // //method-2
    // // html response
    // // here 'error' = views/error.ejs(pass the file)
    // res.render('error', {
    //     title: "Error page",
    // });

    //json response
    // res.json({
    //     "id": "df"
    // });
};

module.exports = {
    notFoundHandler,
    errorHandler,
};