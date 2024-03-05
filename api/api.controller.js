const apiController = {};


apiController.postJson = (req, res, next) => {
    try {
        console.log('req.body :>> ', req.body);
        res.status(200).send(`Received JSON:\n${JSON.stringify(req.body)}`);

        // throw new Error('Test Error');
    } catch (error) {
        next(error); 
    }
};


export {
    apiController
};