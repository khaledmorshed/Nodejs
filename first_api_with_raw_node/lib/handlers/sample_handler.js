// module scaffolding
const handle = {};

handle.sampleHandler = (requestProperties, callBack) => {
    // during calling callback pass the statuscode and data
    callBack(200, {
        key: 'success',
        message: 'This is sample url just for test2',
    });
};

module.exports = handle;
