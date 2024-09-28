// status code 404

// module scaffolding
const handle = {};

handle.notFoundHandler = (requestProperties, callBack) => {
    callBack(404, {
        key: 'not found',
        message: 'Your requested URL was not found!',
    });
};

module.exports = handle;
