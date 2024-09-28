// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes/route');
const { notFoundHandler } = require('../handlers/not_found_handler');

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // handle requrest
    // get the url and parse it
    // true for whole url(means it also consider queryparameters to parse)
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    /* remove splash(but not inside(morshed/about---this is result for(/morshed/about/)))
     before and after
     * */
    const trimPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryObject = parseUrl.query;
    const headerObject = req.headers;

    const requestProperties = {
        parseUrl,
        path,
        trimPath,
        method,
        queryObject,
        headerObject,
    };

    // for string decoder..because req is a buffer
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimPath] ? routes[trimPath] : notFoundHandler;

    // this is for when user post
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // now call chosenHandler function...it calles mean calling handle.sampleHandler
        // or handle.notFoundHandler..During calling pass
        // requestProperties(may be optional) and response
        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};
            const payloadString = JSON.stringify(payload);

            // return the final response
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
};

module.exports = handler;
