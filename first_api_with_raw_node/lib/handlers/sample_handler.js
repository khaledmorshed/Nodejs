// module scaffolding
const handle = {};

handle.sampleHandler = (requestProperties, callBack) => {
    console.log('i am sample');

    // during calling callback pass the statuscode and data
    callBack(200, {
        key: 'success',
        message: 'This is sample url just for test',
    });
};

module.exports = handle;
